import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { ReferenceDef } from '@app/types/References'
import { OthersType } from '@app/types/Others'
import { LocaleStore } from '@app/types/Locale'

import { faTable, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as OTHERS_ACTIONS from '@store_actions/Others'
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
  cardIcon: IconDefinition                          = faTable
  acceptedDocumentFileType                          = definedFileTypes.document

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

  constructor( private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in OthersType)) this.type = OthersType.all
      else this.type = OthersType[passedType]
    })
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.quoteData$ = this.store.pipe(select(state => state?.quote))
    this.resumeData$ = this.store.pipe(select(state => state?.resume))
  }

  ngOnInit(): void {
    this.quoteData$.subscribe((data: QuoteDef) => {
      if (data && Object.keys(data).length) {
        for (const control in this.quoteFormGroup.controls) {
          this.quoteFormGroup.get(control).setValue(data[control])
        }
      } else this.quoteFormGroup.reset()
    })
    this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
    this.resumeData$.subscribe((data: ResumeDef) => this.resumeData = data ? data?.data : null)
    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  fetchData() {
    if (this.type !== OthersType.all) {
      // references are fetched in its own component
      this.type !== OthersType.references && this.store.dispatch(OTHERS_ACTIONS.FETCH(this.type)({ language: this.selectedLocale }))
    } else {
      Object.values(OthersType).filter((type) => typeof type === 'string').forEach((type: string) => {
        type !== OthersType[OthersType.all] && type !== OthersType[OthersType.references] && this.store.dispatch( OTHERS_ACTIONS.FETCH(OthersType[type])({ language: this.selectedLocale }) )
      })
    }
  }

  submitResumeHandler( _$event ) {
    if (this.resumeData) this.store.dispatch(OTHERS_ACTIONS.SAVE_RESUME({ resume: { data: this.resumeData.toString(), language: this.selectedLocale } }))
    else this.store.dispatch(OTHERS_ACTIONS.REMOVE_RESUME({ language: this.selectedLocale }))
  }

  // Write your Quote section
  quoteFormGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    author: new FormControl(null), // new FormControl(initialValue)
    quote: new FormControl(null, Validators.required), // new FormControl(initialValue, validators)
  })

  submitQuoteHandler( _$event ) {
    if (this.quoteFormGroup.valid) this.store.dispatch(OTHERS_ACTIONS.SAVE_QUOTE({ quote: { ...this.quoteFormGroup.value, language: this.selectedLocale } }))
    else this.quoteFormGroup.markAllAsTouched()
  }

  deleteQuoteHandler = () => this.quoteFormGroup.get('id').value != null && this.store.dispatch(OTHERS_ACTIONS.REMOVE_QUOTE({ id: this.quoteFormGroup.get('id').value }))
  isActive = (type: string) => this.type === OthersType.all || this.type === OthersType[type]
}
