import { Injectable } from '@angular/core'
import { checkTokenFailure } from '@app/store/actions/Authentication'
import { Store } from '@ngrx/store'

import * as AUTH_ACTIONS from '@store_actions/Authentication'
import { TOKEN_NAME } from '@app/utils/constants'

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private store: Store) {}

    public logout() {
        this.store.dispatch(checkTokenFailure({}))
    }

    public processHeader(throwError: boolean = true) {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (!token && throwError) {
            // no token found, throwing failure actioncheckAdminUserExists
            this.store.dispatch(AUTH_ACTIONS.checkTokenFailure({}))
        }

        return {
            Authorization: `Bearer ${token}`
        }
    }

    public setToken(token: string) {
        window.localStorage.setItem(TOKEN_NAME, token)
    }

    public removeToken() {
        window.localStorage.removeItem(TOKEN_NAME)
    }
}