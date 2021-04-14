import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditTrainingStructure, TrainingInterface, TrainingType } from '@app/types/Training'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as COMMON_ACTIONS from '@store_actions/Common'
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


type StoreType = { official: TrainingInterface[] } & { computer: TrainingInterface[] } & { other: TrainingInterface[] }
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  faTable: IconDefinition  = faTable;
  faTrash: IconDefinition = faTrash

  type: TrainingType = null;

  colsToRender = [
    'id',
    'tag',
    'description',
    'school',
    'average_score',
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

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type');
      if (!(passedType in TrainingType)) {
        this.type = TrainingType.all;
      } else {
        this.type = TrainingType[passedType];
      }
    })

    this.officialData$ = this.store.pipe(select(state => state?.official))
    this.computerData$ = this.store.pipe(select(state => state?.computer))
    this.otherData$ = this.store.pipe(select(state => state?.other))

    this.translate.prefetch(this.translationsToRequest, this)

  }

  public isTrainingActive = (trainingType: string) => this.type === TrainingType.all || this.type === TrainingType[trainingType]

  ngOnInit(): void {
    this.officialData$.subscribe((data: TrainingInterface[]) => data ? this.officialData = data : null)
    this.computerData$.subscribe((data: TrainingInterface[]) => data ? this.computerData = data : null)
    this.otherData$.subscribe((data: TrainingInterface[]) => data ? this.otherData = data : null)
  }


  openTrainingDialog(data: EditTrainingStructure | TrainingType): void {
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
    const dataIndex = `${TrainingType[trainingData.type]}Data`
    this[dataIndex] = [
      ...this[dataIndex].slice(0, index),
      { ...trainingData},
      ...this[dataIndex].slice(index + 1)
    ];
  }

  editTraining(index: number, type: TrainingType) {
    const training = this[`${TrainingType[type]}Data`][index]
    this.openTrainingDialog({
      training,
      index
    })
  }

  addTraining(trainingData: TrainingInterface) {
    this.editTrainingValues(this[`${TrainingType[trainingData.type]}Data`].length, trainingData)
  }

  get TrainingType() {
    return TrainingType
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
    const training = this[`${TrainingType[type]}Data`][trainingIndex]
    if (!training.id) { // is not stored yet in DB
      this[`${TrainingType[type]}Data`] = [
        ...this[`${TrainingType[type]}Data`].slice(0, trainingIndex),
        ...this[`${TrainingType[type]}Data`].slice(trainingIndex + 1)
      ];
      this.store.dispatch(COMMON_ACTIONS.SUCCESS({
        message: this.translate.getResolvedTranslation('Training deleted successfully', this)
      }))
    } else {
      this.store.dispatch(TRAINING_ACTIONS.REMOVE_TRAINING({
        id: training.id
      }))
    }
  }
}
