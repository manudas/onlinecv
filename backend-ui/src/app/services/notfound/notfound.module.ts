import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundGuardService } from './notfound.service'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NotfoundGuardService]
})
export class NotfoundModule { }
