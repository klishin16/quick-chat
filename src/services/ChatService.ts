import {firestore} from "../index";
import {IChatCreateDTO, IChatUpdateDTO} from "../models/IChat";


export class ChatService {
    static COLLECTION_PATH = 'chats'

    static getAllChats() {
        return firestore.collection(this.COLLECTION_PATH)
    }

    static getChat(chatId: string) {
        return firestore.collection(this.COLLECTION_PATH).doc(chatId)
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

    static getChatMessagesCollection(chatId: string) {
        return firestore.collection(this.COLLECTION_PATH).doc(chatId)
            .collection('messages')
    }

    static getChatMessages(chatId: string) {
        return ChatService.getChatMessagesCollection(chatId).get()
    }
}
