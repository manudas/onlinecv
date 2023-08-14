import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { PortfolioDef, EditPortfolioStructure } from '@app/types/Portfolio'
import { OthersType } from '@app/types/Others'
import { LocaleStore } from '@app/types/Locale'
import { faBookOpen, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as PORTFOLIO_ACTIONS from '@store_actions/Portfolio'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import * as INPUT_HELPERS from './inputHelpers'
import { buildDataMap, MetadataDialog } from '@app/ui/dialog/helpers'

type StoreType = { locale: LocaleStore } & { portfolio: PortfolioDef[] }
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  inputData                                         = INPUT_HELPERS
  cardIcon: IconDefinition                          = faBookOpen
  data: PortfolioDef[]                              = []
  data$: Observable<PortfolioDef[]>

  @Input()
  title: string                                     = 'Others'
  @Input()
  type: string                                      = OthersType[OthersType.portfolio]

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private store: Store<StoreType>, private matDialog: MatDialog ) {
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.data$ = this.store.pipe(select(state => state?.portfolio))
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
    this.data$.subscribe((data: PortfolioDef[]) => { this.data = data ?? this.data })
    this.fetchData()
  }

  openDialog( index: number = null ): void {
    const data = buildDataMap(this.data, index, INPUT_HELPERS, this.type, null)
    const dialogRef = this.matDialog.open(DialogComponent, { height: '65%', maxHeight: '100%', width: '80%', data })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        if (this.isEdit(result)) {
          const { index, portfolio } = result
          this.editDataValues(index, { ...portfolio, language: this.selectedLocale, order: index })
        } else this.add(result)
      }
    })
  }

  onDrop( event: CdkDragDrop<PortfolioDef[]> ) {
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this.data]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentData, indexInArr): PortfolioDef  => {
        return {...currentData, order: indexInArr}
      })
      this.dispatchSave(newArr)
    }
  }

  openRemovalConfirmDialog = ( index: number ): void => {
    const ref = this.data[index]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: new Map<string, PortfolioDef | MetadataDialog>([ ['element', ref], ['metadata', { index, nameKey: 'name', superType: 'portfolio', action: 'delete' }] ])
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(index)}` : '');
      if (index !== null) this.delete(index)
    })
  }

  edit = ( index: number ) => this.openDialog( index )
  delete = ( index: number ) => this.store.dispatch(PORTFOLIO_ACTIONS.REMOVE_PORTFOLIO({ id: this.data?.[index]?.id }))
  editDataValues = ( index: number, refData: PortfolioDef ) => this.dispatchSave([ ...this.data.slice(0, index), { ...refData}, ...this.data.slice(index + 1) ])
  add = ( data: PortfolioDef ) => this.editDataValues(this.data.length, { ...data, language: this.selectedLocale, order: this.data.length })
  isEdit = ( data: EditPortfolioStructure | Object = {} ): data is EditPortfolioStructure => (data as EditPortfolioStructure).index !== undefined
  dispatchSave = ( portfolio ) => this.store.dispatch(PORTFOLIO_ACTIONS.SAVE_PORTFOLIO({ portfolio }))
  fetchData = () => this.store.dispatch(PORTFOLIO_ACTIONS.FETCH_PORTFOLIO ({ language: this.selectedLocale }) )
  debug = (message: string) => console.log(message)
}