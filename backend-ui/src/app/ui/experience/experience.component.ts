import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EditExperienceStructure, ExperienceInterface, ExperienceType } from '@app/types/Experience'
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

type StoreType = { locale: LocaleStore } & {experience: { professional: ExperienceInterface[] } & { ong: ExperienceInterface[] } & { other: ExperienceInterface[] }}
@Component({
  selector: 'app-training',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  faTable: IconDefinition = faTable
  faTrash: IconDefinition = faTrash

  type: ExperienceType = null;

  colsToRender = [
    'id',
    'name',
    'role',
    'description',
    'company',
    'company_url',
    'start_date',
    'finish_date',
    'keywords',
  ]

  // initial state of dragging for reordering working experience
  dragDisabled: boolean = true

  professionalData: ExperienceInterface[] = []
  professionalData$: Observable<ExperienceInterface[]>
  ongData: ExperienceInterface[] = []
  ongData$: Observable<ExperienceInterface[]>
  otherData: ExperienceInterface[] = []
  otherData$: Observable<ExperienceInterface[]>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  @Input() title: string = 'Experience'

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in ExperienceType)) {
        this.type = ExperienceType.all
      } else {
        this.type = ExperienceType[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.professionalData$ = this.store.pipe(select(state => state?.experience?.professional))
    this.ongData$ = this.store.pipe(select(state => state?.experience?.ong))
    this.otherData$ = this.store.pipe(select(state => state?.experience?.other))
  }

  public isExperienceActive(experience: string) {
    return this.type === ExperienceType.all
            || this.type === ExperienceType[experience]
  }

  ngOnInit(): void {
  }

  getExperienceTypeName(type: ExperienceType) {
    return ExperienceType[type]
  }

  openExperienceDialog(data: EditExperienceStructure | string): void {
    // const dialogRef = this.matDialog.open(TrainingDialogComponent, {
    //   width: '80%',
    //   data
    // })

    // dialogRef.afterClosed().subscribe(result => {
    //   logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
    //   if (result) {
    //     if (this.isTrainingEdit(result)) {
    //       const {
    //         index,
    //         training
    //       } = result
    //       this.editTrainingValues(index, training)
    //     } else {
    //       this.addTraining(result)
    //     }
    //   }
    // })
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

  onDrop(event: CdkDragDrop<ExperienceInterface[]>) {
    this.dragDisabled = true
    const type = event.item.data.type
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this[`${type}Data`]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentTraining, indexInArr): ExperienceInterface  => {
        return {...currentTraining, order: indexInArr}
      })
















//      this.dispatchSave(newArr, type)


















    }
  }

  getExperienceSource(type: ExperienceType) {
    return this[`${ExperienceType[type]}Data`]
  }

  get ExperienceType() {
    return ExperienceType
  }

  openExperienceRemovalConfirmDialog(experienceIndex: number, type: ExperienceType): void {
    // const experience = this[`${ExperienceType[type]}Data`][experienceIndex]
    // const dialogRef = this.matDialog.open(ConfirmComponent, {
    //   width: '80%',
    //   data: {
    //     index: experienceIndex,
    //     experience
    //   }
    // })

    // dialogRef.afterClosed().subscribe(({
    //   indexToRemove = null,
    //   type = null,
    // } = {}) => {
    //   logEasy(`The dialog was closed.`, indexToRemove !== null ? `The following message was received: ${JSON.stringify(indexToRemove)}` : '');

    //   if (indexToRemove !== null && type !== null) {
    //     this.deleteExperience(indexToRemove, type)
    //   }

    // })
  }

  editExperience(index: number, type: string) {
    const experience = this[`${type}Data`][index]
    this.openExperienceDialog({
      experience,
      index
    })
  }
}
