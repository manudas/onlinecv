import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  @Input() icon : IconDefinition = null;
  @Input() iconFlip : string = null;
  @Input() iconSize : string = "lg"
  @Input() iconClass : string = null;
  @Input() cardTitle : string = null;
  @Input() cardStyle : string | {} = null;
  @Input() panelTools : TemplateRef<any> = null;
  @Input() panelBody : TemplateRef<any> = null;
  @Input() panelParameters : any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
