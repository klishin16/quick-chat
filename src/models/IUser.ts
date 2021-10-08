export interface IUser {
    id: string
    email: string
    name: string | null
    photoURL: string | null
    authProvider: "google" | "local" | "test"
    uid: string
}

export interface IUserCreateDTO {
    email: string | null
    name: string | null
    photoURL: string | null
    authProvider: "google" | "local" | "test"
    uid: string
}
