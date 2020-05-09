import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  ProgressBarType = ProgressBarEnumType

  @Input() barType: ProgressBarEnumType = ProgressBarEnumType.simple
  @Input() type: string  = 'info'
  @Input() text: string  = ''
  @Input() value: number = 0
  @Input() optionList: ProgressBarListType[] = null

  constructor() { }

  ngOnInit(): void {
    // console.log(this.value);
  }

}

type ProgressBarListType = {
  type: string
  value: number
  text: string
}

export enum ProgressBarEnumType { simple = 1, multiple = 2 }
