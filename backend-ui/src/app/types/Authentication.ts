export type Authentication = {
    token: string
    authenticated: boolean
}

export type AuthenticationResponse = { signup: Authentication, login: never } | { login: Authentication, signup: never }

export type AuthenticationInput = {
    username: string
    password: string
}

export type AdminUserExistResponse = {
    data: {
        checkAdminUserExists: boolean
    }
}