import { NgModule } from '@angular/core';

import { TranslatePipe } from './translation.pipe';

@NgModule({
  declarations: [
    TranslatePipe,
  ],
  exports : [
    TranslatePipe,
  ],
})
export class TranslationsModule { }
