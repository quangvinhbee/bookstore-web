export type USER = {
    displayName?: String
    email: String
    role: 'ADMIN' | 'USER'
}
export interface ADMIN extends USER {}

export const ROLE = { admin: 'ADMIN', user: 'USER' }
