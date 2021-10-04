import {firestore} from "../index";
import {IUserCreateDTO} from "../models/IUser";


export class UserService {
    static COLLECTION_PATH = '/users'

    static getAll() {
        return firestore.collection(this.COLLECTION_PATH)
    }

    static create(chat: IUserCreateDTO) {
        return firestore.collection(this.COLLECTION_PATH).add(chat)
    }
}
