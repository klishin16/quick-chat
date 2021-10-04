export interface IUser {
    uid: string
    email: string | null
    name: string | null
    authProvider: "google" | "local"

}

export type IUserCreateDTO = IUser
