const TOKEN_ADMIN = 'token-bookstore'
const TOKEN_USER = 'token-bookstore-user'

export function setTokenAdmin(token) {
    localStorage.setItem(TOKEN_ADMIN, token)
}
export function getTokenAdmin() {
    return localStorage.getItem(TOKEN_ADMIN)
}

export function setTokenUser(token) {
    localStorage.setItem(TOKEN_USER, token)
}
export function getTokenUser() {
    return localStorage.getItem(TOKEN_USER)
}
