export type Authentication = {
    token: string
    authenticated: boolean
}

export type AuthenticationResponse = { signup: Authentication, authentication: never } | { authentication: Authentication, signup: never }

export type AuthenticationInput = {
    username: string
    password: string
}

export type AdminUserExistResponse = {
    checkAdminUserExists: boolean
}

export type AdminUserResponse = {
    adminUser: string
}
