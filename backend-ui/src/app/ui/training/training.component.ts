import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { logEasy } from '@app/services/logging';
import { EditTrainingStructure, TrainingInterface, TrainingType } from '@app/types/Training';

import {
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainingDialogComponent } from './training-dialog.component';

type StoreType = { official: TrainingInterface[] } & { computer: TrainingInterface[] } & { other: TrainingInterface[] }
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  faTable = faTable;
  type: TrainingType = null;

  colsToRender = [
    'id',
    'name',
    'description',
    'type',
    'school',
    'school_url',
    'start_date',
    'finish_date',
    'average_score',
    'keywords',
  ];

  officialData$: Observable<TrainingInterface[]>
  officialData: TrainingInterface[] = []
  computerData$: Observable<TrainingInterface[]>
  computerData: TrainingInterface[] = []
  otherData$: Observable<TrainingInterface[]>
  otherData: TrainingInterface[] = []

  title: string = 'Training';

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog) {
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

  addTraining(trainingData: TrainingInterface) {
    this.editTrainingValues(this[`${TrainingType[trainingData.type]}Data`].length, trainingData)
  }

  get TrainingType() {
    return TrainingType
  }

  getTrainingSource(type: TrainingType) {
    return this[`${TrainingType[type]}Data`]
  }
}
