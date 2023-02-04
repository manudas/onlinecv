import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { SpinnerOverlayComponent } from '@ui/loading-spinner/component/overlay/spinner-overlay.component'

@Injectable({
    providedIn: 'root'
})
export class SpinnerOverlayService {
    private overlayRef: OverlayRef = null;

    constructor(private overlay: Overlay) {}

    public show(message = null) {
        // Returns an OverlayRef (which is a PortalHost)

        if (!this.overlayRef) {
        this.overlayRef = this.overlay.create();
        }

        // Create ComponentPortal that can be attached to a PortalHost
        const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
        const componentRef = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost

        // pass data via Input:
        componentRef.instance.message = message // Will we need to detect changes?
    }

    public hide() {
        if (!!this.overlayRef) {
            this.overlayRef.detach();
        }
    }
}