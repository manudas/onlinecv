import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import * as LANGUAGE_ACTIONS from '@store_actions/Languages'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { LocaleStore } from '@app/types/Locale'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { EditLanguageStructure, LanguageInterface } from '@app/types/Languages'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import { buildDataMap, MetadataDialog } from '@app/ui/dialog/helpers'
import * as INPUT_HELPERS from './inputHelpers'

type StoreType = { locale: LocaleStore } & { languages: { list: LanguageInterface[] } }

@Component({
  selector: 'app-language-skills',
  templateUrl: './language-skills.component.html',
  styleUrls: ['./language-skills.component.scss']
})
export class LanguageSkillsComponent implements OnInit {
  cardIcon: IconDefinition                            = faLanguage
  data: LanguageInterface[]                           = []
  inputData                                           = INPUT_HELPERS
  title: string                                       = 'Skills'
  type: string                                        = 'Languages'

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>
  data$: Observable<LanguageInterface[]>

  constructor( private store: Store<StoreType>, private matDialog: MatDialog ) {
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.prepareDataSubscriptions('languages')
  }

  private prepareDataSubscriptions(storeKey: string) {
    this.data$ = this.store.pipe(select(state => state?.[storeKey]?.list))
    this.data$.subscribe((data: LanguageInterface[]) => data ? this.data = data : null)
  }

  add = ( data: LanguageInterface ) => this.editValues(this.data.length, { ...data, language: this.selectedLocale, order: this.data.length })
  edit = ( index: number ) => this.openDialog( index )
  editValues = ( index: number, languageData: LanguageInterface ) => this.dispatchSave([ ...this.data.slice(0, index), { ...languageData}, ...this.data.slice(index + 1) ])
  isLanguageEdit = ( data: LanguageInterface | EditLanguageStructure | Object = {} ): data is EditLanguageStructure => (data as EditLanguageStructure).index !== undefined
  ngOnInit() { this.selectedLocale$.subscribe((data: string) => {this.selectedLocale = data; this.fetchData()}) }
  fetchData = () => this.store.dispatch(LANGUAGE_ACTIONS.FETCH_LANGUAGES({ language: this.selectedLocale }))

  openDialog( index: number = null ): void {
    const data = buildDataMap(this.data, index, INPUT_HELPERS, this.title, this.type)
    const dataLanguage = data.get('language')
    data.set('language', {...dataLanguage, value: this.selectedLocale})
    const dialogRef = this.matDialog.open(DialogComponent, { width: '80%', data })

    dialogRef.afterClosed().subscribe((result: LanguageInterface | EditLanguageStructure) => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      if (result) {
        if (this.isLanguageEdit(result)) {
          const { index, language } = result
          this.editValues(index, { ...language, language: this.selectedLocale, order: index })
        } else this.add(result)
      }
    })
  }

  dispatchSave( data ) {
    const curatedData = data.map(language => {
      return { ...language, ...(language.written_level ? {written_level: Number(language.written_level)} : {}), ...(language.spoken_level ? {spoken_level: Number(language.spoken_level)} : {}) }
    })
    this.store.dispatch(LANGUAGE_ACTIONS.SAVE_LANGUAGES({ languages: curatedData }))
  }

  onDrop( event: CdkDragDrop<LanguageInterface[]> ) {
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this.data]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentSkills, indexInArr): LanguageInterface  => {
        return {...currentSkills, order: indexInArr}
      })
      this.dispatchSave(newArr)
    }
  }

  openRemovalConfirmDialog = ( index: number ): void => {
    const language = this.data[index]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: new Map<string, LanguageInterface | MetadataDialog>([ ['element', language], ['metadata', { index, nameKey: 'name', superType: 'language', action: 'delete' }] ])
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(element)}` : '');
      if (index !== null) this.delete(index)
    })
  }

  delete( index: number ) {
    const language = this.data[index]
    this.store.dispatch(LANGUAGE_ACTIONS.REMOVE_LANGUAGE({ id: language.id }))
  }
}