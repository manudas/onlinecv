import { Component, OnInit, Input } from '@angular/core'

import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons'

import { DataService } from '@services/data/data.service'
import { Details as DetailsQuery } from '@services/data/queries'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'] 
})
export class DetailsComponent implements OnInit {

  faEdit: IconDefinition = faEdit
  details: object = null

  @Input() title: string = 'Personal details';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.readData(DetailsQuery, {"language": "en"}).subscribe(data => {
      this.details = data;
    });
  }

}