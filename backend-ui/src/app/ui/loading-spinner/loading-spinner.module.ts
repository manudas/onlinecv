import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SpinnerOverlayComponent } from './component/overlay/spinner-overlay.component'
import { SpinnerComponent } from './component/spinner/loading-spinner.component';
import { SpinnerOverlayService } from './spinner-service/spinner-overlay.service';

@NgModule({
    declarations: [SpinnerOverlayComponent, SpinnerComponent],
    imports: [CommonModule],
    exports: [SpinnerOverlayComponent],
    providers: [SpinnerOverlayService]
})
export class SpinnerServiceModule {}
