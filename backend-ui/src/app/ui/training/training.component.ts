import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditTrainingStructure, TrainingInterface, TrainingType } from '@app/types/Training'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as TRAINING_ACTIONS from '@store_actions/Training'

import { faTable } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { LocaleStore } from '@app/types/Locale'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import * as INPUT_HELPERS from './inputHelpers'
import { buildDataMap } from '@app/ui/dialog/helpers'

type StoreType = { locale: LocaleStore } & { trainings: { official: TrainingInterface[] } & { computer: TrainingInterface[] } & { other: TrainingInterface[] }}
@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
    TrainingType                                                            = TrainingType
    cardIcon: IconDefinition                                                = faTable
    type: TrainingType                                                      = null
    inputData                                                               = INPUT_HELPERS
    data$: Partial<Record<TrainingType, Observable<TrainingInterface[]>>>   = {}
    data: Partial<Record<TrainingType, TrainingInterface[]>>                = {}
    title: string                                                           = 'Training'

    selectedLocale: string; // iso code
    selectedLocale$: Observable<string>

    constructor( private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog ) {
        this.activatedRoute.paramMap.subscribe((params) => {
            const passedType: string = params.get('type')
            if (!(passedType in TrainingType)) {
                this.type = TrainingType.all
            } else {
                this.type = TrainingType[passedType]
            }
        })

        this.selectedLocale$ = this.store.pipe( select((state) => state?.locale?.selectedLocale) )
        this.prepareDataSubscriptions('trainings')
    }

    add = (data: TrainingInterface) => this.editValues( this.data[TrainingType[data.type]].length, { ...data, language: this.selectedLocale, order: this.data[TrainingType[data.type]].length })
    dispatchSave = (data, type) => this.store.dispatch( TRAINING_ACTIONS.SAVE_TRAININGS( { trainings: data, trainingType: type }) )
    edit = (type: string) => (index: number) => this.openDialog( type, index )
    editValues = ( index: number, data: TrainingInterface ) => this.dispatchSave([ ...this.data[TrainingType[data.type]].slice(0, index), { ...data }, ...this.data[TrainingType[data.type]].slice(index + 1) ], data.type)
    isEdit = ( data: TrainingInterface | EditTrainingStructure | Object = {} ): data is EditTrainingStructure => ( (data as EditTrainingStructure).index !== undefined )
    isActive = (trainingType: string) => this.type === TrainingType.all || this.type === TrainingType[trainingType]

    private prepareDataSubscriptions(storeKey: string) {
        for (let type of Object.values(TrainingType)) { // type here is string, ExpertienceType[type] will be a number in common enums
          if (typeof type === 'string' || type === TrainingType.all) continue
          this.data$[type] = this.store.pipe(select(state => state?.[storeKey]?.[TrainingType[type]]))
          this.data$[type].subscribe((data: TrainingInterface[]) => data ? this.data[type] = data : null)
        }
    }
    ngOnInit(): void {
        this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
        this.activatedRoute.paramMap.subscribe(() => this.fetchData() )
    }

    fetchData() {
        if (this.type !== TrainingType.all) {
            this.store.dispatch(TRAINING_ACTIONS.FETCH_TRAINING( { language: this.selectedLocale, trainingType: TrainingType[this.type] }) )
        } else {
            Object.values(TrainingType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
                type !== TrainingType[TrainingType.all] && this.store.dispatch( TRAINING_ACTIONS.FETCH_TRAINING({ language: this.selectedLocale, trainingType: type }) )
            })
        }
    }

    openDialog( type: string, index: number = null ): void {
        const data = buildDataMap(this.data[TrainingType[type]], index, INPUT_HELPERS, this.title, type)
        const dataType = data.get('type')
        data.set('type', {...dataType, value: type})
        const dialogRef = this.matDialog.open( DialogComponent, { width: '80%', data })
        dialogRef.afterClosed().subscribe((result) => {
            logEasy( `The dialog was closed.`, result ? `The following message was received: ${JSON.stringify( result )}` : '')
            if (result) {
                if (this.isEdit(result)) {
                    const { index, training } = result;
                    this.editValues(index, { ...training, language: this.selectedLocale, order: index })
                } else this.add(result)
            }
        })
    }

    openRemovalConfirmDialog = ( type: TrainingType ) => (index: number): void => {
        const training = this.data[TrainingType[type]][index];
        const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, element: training, action: 'delete', nameKey: 'tag', superType: 'training' }})

        dialogRef.afterClosed().subscribe((data) => {
            const { _index } = data ?? {}
            logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(data)}` : '' )
            if ( _index !== null && type !== null ) this.delete(type)(_index)
        })
    }

    delete = ( type: TrainingType ) => (index: number) => {
        const training = this.data[TrainingType[type]][index]
        this.store.dispatch( TRAINING_ACTIONS.REMOVE_TRAINING({ id: training.id, trainingType: TrainingType[type] }))
    }

    onDrop( event: CdkDragDrop<TrainingInterface[]> ) {
        const type = event.item.data.type
        if (event.previousIndex !== event.currentIndex) {
            const currentArr = [...this.data[type]]
            moveItemInArray( currentArr, event.previousIndex, event.currentIndex )
            // let's assign the new order properties inside the reordered list of objects
            const newArr = currentArr.map(( currentTraining, indexInArr ): TrainingInterface => {
                return { ...currentTraining, order: indexInArr }
            })
            this.dispatchSave(newArr, type);
        }
    }
}