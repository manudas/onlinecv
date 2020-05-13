import { Component, OnInit, Input } from '@angular/core';
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

  @Input() title: string = 'Training';

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
  regulated,
  computer,
  others
}