import {firestore} from "../index";
import {IChatCreateDTO, IChatUpdateDTO} from "../models/IChat";



export class ChatService {
    static COLLECTION_PATH = '/chats'
    static getAllChats() {
        return firestore.collection(this.COLLECTION_PATH)
    }
    static create(chat: IChatCreateDTO) {
        return firestore.collection(this.COLLECTION_PATH).add(chat)
    }
    static update(id: string, value: IChatUpdateDTO) {
        return firestore.collection(this.COLLECTION_PATH).doc(id).update(value)
    }
    static delete(id: string) {
        return firestore.collection(this.COLLECTION_PATH).doc(id).delete()
    }
}
