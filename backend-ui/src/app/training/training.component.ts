import { Component, OnInit, Input } from '@angular/core';

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

  @Input() title: string = 'Training';

  constructor() { }

  ngOnInit(): void {
  }

}
