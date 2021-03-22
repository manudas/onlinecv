import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  faTable,
} from '@fortawesome/free-solid-svg-icons';

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

  officialData: string[] = null;
  computerData: string[] = null;
  otherData: string[] = null;

  title: string = 'Training';

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => { 
      const passedType: string = params.get('type');
      if (!(passedType in TrainingType)) {
        this.type = TrainingType.all;
      } else {
        this.type = TrainingType[passedType];
      }

    });
  }

  public isTrainingActive(trainingType: string) {
    return this.type === TrainingType.all
            || this.type === TrainingType[trainingType];
  }

  ngOnInit(): void {
  }

}

enum TrainingType {
  all,
  official,
  computer,
  others
}