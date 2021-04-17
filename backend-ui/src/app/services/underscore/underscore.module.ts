import { NgModule } from '@angular/core'

import { UnderscorePipe } from './underscore.pipe'

@NgModule({
  declarations: [
    UnderscorePipe,
  ],
  imports: [
    // CommonModule,
  ],
  exports : [
    UnderscorePipe,
  ]
})
export class UnderscoreModule { }
