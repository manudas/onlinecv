import { NgModule } from '@angular/core'

import { SpecialCharsPipe } from './specialChars.pipe'

@NgModule({
  declarations: [
    SpecialCharsPipe,
  ],
  exports : [
    SpecialCharsPipe,
  ]
})
export class SpecialCharsModule { }
