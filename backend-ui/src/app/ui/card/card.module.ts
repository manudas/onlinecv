import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardComponent } from '@app/ui/card/card.component'

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [CardComponent]
})
export class CardModule { }
