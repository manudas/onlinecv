import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  faTable,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-training',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  faTable = faTable;
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
  ];

  professionalData: string[] = null;
  ongData: string[] = null;
  otherData: string[] = null;

  @Input() title: string = 'Experience';

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type');
      if (!(passedType in ExperienceType)) {
        this.type = ExperienceType.all;
      } else {
        this.type = ExperienceType[passedType];
      }

    });
  }

  public isExperienceActive(experience: string) {
    return this.type === ExperienceType.all
            || this.type === ExperienceType[experience];
  }

  ngOnInit(): void {
  }

}

enum ExperienceType {
  all,
  professional,
  ong,
  others
}