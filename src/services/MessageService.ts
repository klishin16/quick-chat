import {IUser} from "../models/IUser";
import {IChat} from "../models/IChat";
import {ChatService} from "./ChatService";
import {IMessageCreateDTO} from "../models/IMessage";
import firebase from "firebase/compat";

class MessageService {
    private COLLECTION_PATH = 'messages'

    createChatMessage(user: IUser, chat: IChat, text: string) {
        const messageCreateDTO: IMessageCreateDTO = {
            uid: user.uid,
            photoUrl: user.photoURL!,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            text: text,
            displayName: user.name!
        }
        return ChatService.getChat(chat.id).collection(this.COLLECTION_PATH).add(messageCreateDTO)
    }

    getChatMessagesCollection(chat: IChat) {
        return ChatService.getChat(chat.id).collection(this.COLLECTION_PATH).orderBy('createdAt')
    }
}

export default new MessageService()
