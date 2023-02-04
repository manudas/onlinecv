import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { ComponentRef, Injectable } from '@angular/core'
import { SpinnerOverlayComponent } from '@ui/loading-spinner/component/overlay/spinner-overlay.component'

@Injectable({
    providedIn: 'root'
})
export class SpinnerOverlayService {
    private overlayRef: OverlayRef = null
    private componentRef: ComponentRef<SpinnerOverlayComponent>

    constructor(private overlay: Overlay) {}

    public show(message = null) {
        if (!this.overlayRef) {
            // Returns an OverlayRef (which is a PortalHost)
            this.overlayRef = this.overlay.create()
        }

        // Check if we have a previous overlay attached to the a PortalHost
        if (!this.overlayRef.hasAttached()) {
            // Create ComponentPortal that can be attached to a PortalHost
            const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent)
            this.componentRef = this.overlayRef.attach(spinnerOverlayPortal) // Attach ComponentPortal to PortalHost
        }

        // pass data via Input:
        this.componentRef.instance.message = message // Will we need to detect changes?
    }

    public hide() {
        if (!!this.overlayRef) {
            setTimeout(() => this.overlayRef.detach(), 1000)
        }
    }
}