import { environment } from '@environments/environment'
import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { LoginService } from '@ui/login/login-service/login.service'

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor( private loginService: LoginService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!environment.production) console.log('++Intercepted Http call for loading Login service')
        return next.handle(request).pipe(
            catchError((err: any, caught: Observable<HttpEvent<unknown>>) => {
                if (err instanceof HttpErrorResponse) {
                    if (!environment.production) console.log('--Intercepted Http call for loading Login service: Handling call result')
                    const authenticationFailure = err?.status === 401
                    if (authenticationFailure === true) {
                        this.loginService.logout()
                    }
                }

                // we are not interested in retry, so we do return an empty Observable
                return of()
            }),
        )
    }
}