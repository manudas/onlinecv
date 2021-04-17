import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditTrainingStructure, TrainingInterface, TrainingType } from '@app/types/Training'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as TRAINING_ACTIONS from '@store_actions/Training'

import {
  faArrowsAlt,
  faEdit,
  faTable,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { TrainingDialogComponent } from './training-dialog.component'
import { TranslationService } from '@app/services/translation/translation.service'
import { ConfirmComponent } from './confirm.component'
import { LocaleStore } from '@app/types/Locale'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'


type StoreType = { locale: LocaleStore } & {trainings: { official: TrainingInterface[] } & { computer: TrainingInterface[] } & { other: TrainingInterface[] }}
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  faTable: IconDefinition  = faTable
  faTrash: IconDefinition = faTrash

  type: TrainingType = null;

  colsToRender = [
    'id',
    'tag',
    'description',
    'school',
    'average_grade',
    'edit',
    'delete',
    'order',
  ];

  officialData$: Observable<TrainingInterface[]>
  officialData: TrainingInterface[] = []
  computerData$: Observable<TrainingInterface[]>
  computerData: TrainingInterface[] = []
  otherData$: Observable<TrainingInterface[]>
  otherData: TrainingInterface[] = []

  title: string = 'Training';

  // initial state of dragging for reordering trainings
  dragDisabled: boolean = true

  translationsToRequest = ['Training deleted successfully']
  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type');
      if (!(passedType in TrainingType)) {
        this.type = TrainingType.all;
      } else {
        this.type = TrainingType[passedType];
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.officialData$ = this.store.pipe(select(state => state?.trainings?.official))
    this.computerData$ = this.store.pipe(select(state => state?.trainings?.computer))
    this.otherData$ = this.store.pipe(select(state => state?.trainings?.other))

    this.translate.prefetch(this.translationsToRequest, this)

  }

  public isTrainingActive = (trainingType: string) => this.type === TrainingType.all || this.type === TrainingType[trainingType]

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)
    this.officialData$.subscribe((data: TrainingInterface[]) => data ? this.officialData = data : null)
    this.computerData$.subscribe((data: TrainingInterface[]) => data ? this.computerData = data : null)
    this.otherData$.subscribe((data: TrainingInterface[]) => data ? this.otherData = data : null)
    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  fetchData() {
    if (this.type !== TrainingType.all) {
      this.store.dispatch(TRAINING_ACTIONS.FETCH_TRAINING({
        language: this.selectedLocale,
        trainingType: TrainingType[this.type]
      }))
    } else {
      Object.values(TrainingType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
        type !== TrainingType[TrainingType.all] && this.store.dispatch(
          TRAINING_ACTIONS.FETCH_TRAINING({
            language: this.selectedLocale,
            trainingType: type
          })
        )
      })
    }
  }

  openTrainingDialog(data: EditTrainingStructure | string): void {
    const dialogRef = this.matDialog.open(TrainingDialogComponent, {
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        if (this.isTrainingEdit(result)) {
          const {
            index,
            training
          } = result
          this.editTrainingValues(index, training)
        } else {
          this.addTraining(result)
        }
      }
    })
  }

  isTrainingEdit(data: TrainingInterface | EditTrainingStructure | Object = {}): data is EditTrainingStructure {
    return (data as EditTrainingStructure).index !== undefined
  }

  editTrainingValues(index: number, trainingData: TrainingInterface) {
    const dataIndex = `${trainingData.type}Data`
    const newTrainings = [
      ...this[dataIndex].slice(0, index),
      { ...trainingData},
      ...this[dataIndex].slice(index + 1)
    ];
    this.dispatchSave(newTrainings, trainingData.type)
  }

  dispatchSave(data, type) {
    this.store.dispatch(TRAINING_ACTIONS.SAVE_TRAININGS({
      trainings: data,
      trainingType: type
    }))
  }

  editTraining(index: number, type: string) {
    const training = this[`${type}Data`][index]
    this.openTrainingDialog({
      training,
      index
    })
  }

  addTraining(trainingData: TrainingInterface) {
    this.editTrainingValues(this[`${trainingData.type}Data`].length, {
      ...trainingData,
      language: this.selectedLocale,
      order: this[`${trainingData.type}Data`].length
    })
  }

  get TrainingType() {
    return TrainingType
  }

  getTrainingTypeName(type: TrainingType) {
    return TrainingType[type]
  }

  getTrainingSource(type: TrainingType) {
    return this[`${TrainingType[type]}Data`]
  }

  openTrainingRemovalConfirmDialog(trainingIndex: number, type: TrainingType): void {
    const training = this[`${TrainingType[type]}Data`][trainingIndex]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index: trainingIndex,
        training
      }
    })

    dialogRef.afterClosed().subscribe(({
      indexToRemove = null,
      type = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, indexToRemove !== null ? `The following message was received: ${JSON.stringify(indexToRemove)}` : '');

      if (indexToRemove !== null && type !== null) {
        this.deleteTraining(indexToRemove, type)
      }

    })
  }

  deleteTraining(trainingIndex: number, type: TrainingType) {
    const training = this[`${type}Data`][trainingIndex]
    this.store.dispatch(TRAINING_ACTIONS.REMOVE_TRAINING({
      id: training.id,
      trainingType: type.toString()
    }))
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

  onDrop(event: CdkDragDrop<TrainingInterface[]>) {
    this.dragDisabled = true
    const type = event.item.data.type
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this[`${type}Data`]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentTraining, indexInArr): TrainingInterface  => {
        return {...currentTraining, order: indexInArr}
      })
      this.dispatchSave(newArr, type)
    }
  }
}
