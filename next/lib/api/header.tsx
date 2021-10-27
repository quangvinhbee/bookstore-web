const TOKEN_ADMIN = 'token-bookstore'

export function setTokenAdmin(token) {
    localStorage.setItem(TOKEN_ADMIN, token)
}
export function getTokenAdmin(token) {
    return localStorage.getItem(TOKEN_ADMIN)
}
