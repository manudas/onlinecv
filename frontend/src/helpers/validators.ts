export function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
}

export function isEmpty(text: string) {
    return !text
}