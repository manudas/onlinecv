import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { ReferenceDef, EditReferenceStructure } from '@app/types/References'
import { OthersType } from '@app/types/Others'
import { LocaleStore } from '@app/types/Locale'

import {
  faArrowsAlt,
  faEdit,
  faTable,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as OTHERS_ACTIONS from '@store_actions/Others'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { OthersDialogComponent } from './others-dialog.component'
import { definedFileTypes } from '@app/utils/Files'
import { QuoteDef, ResumeDef } from '@app/types'
import { FormControl, FormGroup, Validators } from '@angular/forms'

type StoreType = { locale: LocaleStore } & { references: ReferenceDef[] } & { resume: ResumeDef } & { quote: QuoteDef }
@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  cardIcon: IconDefinition = faTable
  faTrash: IconDefinition = faTrash

  colsToRender = [
    'name',
    'company',
    'edit',
    'delete',
    'order',
  ]

  // initial state of dragging for reordering data
  dragDisabled: boolean = true

  referencesData: ReferenceDef[] = []
  referencesData$: Observable<ReferenceDef[]>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  quoteData$: Observable<QuoteDef>
  quoteData: QuoteDef

  type: OthersType

  resumeData$: Observable<ResumeDef>
  _resumeData: Blob
  set resumeData(data: any) {
    this._resumeData = data
  }
  get resumeData() {
    return this._resumeData
  }

  acceptedDocumentFileType = definedFileTypes.document

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in OthersType)) {
        this.type = OthersType.all
      } else {
        this.type = OthersType[passedType]
      }
    })

    this.quoteData$ = this.store.pipe(select(state => state?.quote))

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.referencesData$ = this.store.pipe(select(state => state?.references))

    this.resumeData$ = this.store.pipe(select(state => state?.resume))
  }

  public isElementActive(type: string) {
    return this.type === OthersType.all
            || this.type === OthersType[type]
  }

  ngOnInit(): void {
    this.quoteData$.subscribe((data: QuoteDef) => {
      if (data && Object.keys(data).length) {
        for (const control in this.quoteFormGroup.controls) {
          this.quoteFormGroup.get(control).setValue(data[control])
        }
      } else this.quoteFormGroup.reset()
    })
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)
    this.referencesData$.subscribe((data: ReferenceDef[]) => {
      this.referencesData = data ?? this.referencesData
    })
    this.resumeData$.subscribe((data: ResumeDef) => this.resumeData = data ? data?.data : null)
    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  openAddEditDialog(data: EditReferenceStructure = {
    index: null,
    reference: null
  }): void {
    const dialogRef = this.matDialog.open(OthersDialogComponent, {
      height: '65%',
      maxHeight: '100%',
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        if (this.isDataEdit(result)) {
          const {
            index,
            reference
          } = result
          this.editDataValues(index, {
            ...reference,
            language: this.selectedLocale,
            order: index
          })
        } else {
          this.addData(result)
        }
      }
    })
  }

  onDragStart($event) {
    const draggingElement: HTMLElement = document.querySelector('mat-row.cdk-drag-preview')
    if (draggingElement) {
      draggingElement.style['box-shadow'] =
        `0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12)`
    }
  }

  onDrop(event: CdkDragDrop<ReferenceDef[]>) {
    this.dragDisabled = true
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this.referencesData]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentData, indexInArr): ReferenceDef  => {
        return {...currentData, order: indexInArr}
      })

      this.dispatchSave(newArr)
    }
  }

  openDataRemovalConfirmDialog(index: number): void {
    const ref = this.referencesData[index]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index: index,
        element: ref,
        nameKey: 'role',
        superType: 'reference',
        action: 'delete'
      }
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(index)}` : '');

      if (index !== null) {
        this.deleteData(index)
      }

    })
  }

  editData(index: number) {
    const reference = this.referencesData[index]
    this.openAddEditDialog({
      reference,
      index
    })
  }

  deleteData(index: number) {
    const ref = this.referencesData[index]
    this.store.dispatch(OTHERS_ACTIONS.REMOVE_REFERENCE({
      id: ref.id,
    }))
  }

  isDataEdit(data: EditReferenceStructure | Object = {}): data is EditReferenceStructure {
    return (data as EditReferenceStructure).index !== undefined
  }

  editDataValues(index: number, refData: ReferenceDef) {
    const newReferences = [
      ...this.referencesData.slice(0, index),
      { ...refData},
      ...this.referencesData.slice(index + 1)
    ];
    this.dispatchSave(newReferences)
  }

  addData(data: ReferenceDef) {
    this.editDataValues(this.referencesData.length, {
      ...data,
      language: this.selectedLocale,
      order: this.referencesData.length
    })
  }

  dispatchSave(references) {
    this.store.dispatch(OTHERS_ACTIONS.SAVE_REFERENCES({
      references,
    }))
  }

  fetchData() {
    if (this.type !== OthersType.all) {
      this.store.dispatch(OTHERS_ACTIONS.FETCH(this.type)({
        language: this.selectedLocale,
      }))
    } else {
      Object.values(OthersType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
        type !== OthersType[OthersType.all] && this.store.dispatch(
          OTHERS_ACTIONS.FETCH(OthersType[type])({
            language: this.selectedLocale,
          })
        )
      })
    }
  }

  submitResumeHandler(_$event) {
    if (this.resumeData) {
      this.store.dispatch(OTHERS_ACTIONS.SAVE_RESUME({
        resume: {
          data: this.resumeData.toString(),
          language: this.selectedLocale,
        }
      }))
    } else {
      this.store.dispatch(OTHERS_ACTIONS.REMOVE_RESUME({
        language: this.selectedLocale,
      }))
    }
  }

  // Write your Quote section
  quoteFormGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    author: new FormControl(null), // new FormControl(initialValue)
    quote: new FormControl(null, Validators.required), // new FormControl(initialValue, validators)
  })

  submitQuoteHandler($event) {
    if (this.quoteFormGroup.valid) {
      const data = this.quoteFormGroup.value
      this.store.dispatch(OTHERS_ACTIONS.SAVE_QUOTE({
        quote: { ...data, language: this.selectedLocale }
      }))
    } else {
      this.quoteFormGroup.markAllAsTouched()
    }
  }

  deleteQuoteHandler($event) {
    if (this.quoteFormGroup.get('id').value) {
      this.store.dispatch(OTHERS_ACTIONS.REMOVE_QUOTE({
        id: this.quoteFormGroup.get('id').value
      }))
    }
  }
}
