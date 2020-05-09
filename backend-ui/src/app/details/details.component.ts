import { Component, OnInit } from '@angular/core';

import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faEdit = faEdit

  constructor() { }

  ngOnInit(): void {
  }

}
