import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { SpinnerOverlayService } from '../spinner-service/spinner-overlay.service'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private totalRequests = 0

    constructor( private loadingService: SpinnerOverlayService ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('++Intercepted Http call')
        this.totalRequests++
        this.loadingService.show()
        return next.handle(request).pipe(
            finalize(() => {
                console.log('--Intercepted Http call')
                this.totalRequests--
                if (this.totalRequests == 0) {
                    this.loadingService.hide()
                }
            })
        )
    }
}