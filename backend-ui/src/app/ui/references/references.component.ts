import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { ReferenceDef, EditReferenceStructure } from '@app/types/References'
import { OthersType } from '@app/types/Others'
import { LocaleStore } from '@app/types/Locale'
import { faAddressCard, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as OTHERS_ACTIONS from '@store_actions/Others'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import * as INPUT_HELPERS from './inputHelpers'
import { buildDataMap } from '@app/ui/dialog/helpers'

type StoreType = { locale: LocaleStore } & { references: ReferenceDef[] }
@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {
  inputData                                         = INPUT_HELPERS
  cardIcon: IconDefinition                          = faAddressCard
  data: ReferenceDef[]                              = []
  data$: Observable<ReferenceDef[]>

  @Input()
  title: string                                     = 'Others'
  @Input()
  type: string                                      = OthersType[OthersType.references]

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private store: Store<StoreType>, private matDialog: MatDialog ) {
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.data$ = this.store.pipe(select(state => state?.references))
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
    this.data$.subscribe((data: ReferenceDef[]) => { this.data = data ?? this.data })
  }

  openDialog( index: number = null ): void {
    const data = buildDataMap(this.data, index, INPUT_HELPERS, this.title, this.type)
    const dialogRef = this.matDialog.open(DialogComponent, { height: '65%', maxHeight: '100%', width: '80%', data })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        if (this.isEdit(result)) {
          const { index, reference } = result
          this.editDataValues(index, { ...reference, language: this.selectedLocale, order: index })
        } else this.add(result)
      }
    })
  }

  onDrop( event: CdkDragDrop<ReferenceDef[]> ) {
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this.data]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentData, indexInArr): ReferenceDef  => {
        return {...currentData, order: indexInArr}
      })
      this.dispatchSave(newArr)
    }
  }

  openRemovalConfirmDialog( index: number ): void {
    const ref = this.data[index]
    const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, element: ref, nameKey: 'role', superType: 'reference', action: 'delete' } })

    dialogRef.afterClosed().subscribe(({
      index = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(index)}` : '');
      if (index !== null) this.delete(index)
    })
  }

  edit = ( index: number ) => this.openDialog( index )
  delete = ( index: number ) => this.store.dispatch(OTHERS_ACTIONS.REMOVE_REFERENCE({ id: this.data?.[index]?.id }))
  editDataValues = ( index: number, refData: ReferenceDef ) => this.dispatchSave([ ...this.data.slice(0, index), { ...refData}, ...this.data.slice(index + 1) ])
  add = ( data: ReferenceDef ) => this.editDataValues(this.data.length, { ...data, language: this.selectedLocale, order: this.data.length })
  isEdit = ( data: EditReferenceStructure | Object = {} ): data is EditReferenceStructure => (data as EditReferenceStructure).index !== undefined
  dispatchSave = ( references ) => this.store.dispatch(OTHERS_ACTIONS.SAVE_REFERENCES({ references }))
  fetchData = () => this.store.dispatch(OTHERS_ACTIONS.FETCH(OthersType[this.type])({ language: this.selectedLocale }))
}