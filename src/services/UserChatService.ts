import {ChatService} from "./ChatService";
import {firestore} from "../index";
import UserService from "./UserService";
import {IUser} from "../models/IUser";
import {IChat} from "../models/IChat";


export class UserChatService {
    static USER_REFER_PATH = 'userChats';
    static CHAT_REFER_PATH = 'chatUsers'
    static addUserToChat(user: IUser, chat: IChat) {
        const uRef = UserService.getUser(user.id).collection(UserChatService.USER_REFER_PATH).doc(chat.id)
        const cRef = ChatService.getChat(chat.id).collection(UserChatService.CHAT_REFER_PATH).doc(user.id)

        const batch = firestore.batch()
        batch.set(uRef, {...chat})
        batch.set(cRef, {...user})

        return batch.commit()
    }

    static removeUserFromChat(user: IUser, chat: IChat) {
        const uRef = UserService.getUser(user.id).collection(UserChatService.USER_REFER_PATH).doc(chat.id)
        const cRef = ChatService.getChat(chat.id).collection(UserChatService.CHAT_REFER_PATH).doc(user.id)

        const batch = firestore.batch()
        batch.delete(uRef)
        batch.delete(cRef)

        return batch.commit()
    }

    static getUserChats(userId: string) {
        return UserService.getUser(userId).collection(UserChatService.USER_REFER_PATH)
    }

    static getChatUsers(chatId: string) {
        return ChatService.getChat(chatId).collection(UserChatService.CHAT_REFER_PATH)
    }
}
