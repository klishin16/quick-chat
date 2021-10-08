import {firestore} from "../index";
import {IUserCreateDTO} from "../models/IUser";
import firebase from "firebase/compat";


class UserService {
    private COLLECTION_PATH: string = 'users'

     getAll() {
        return firestore.collection(this.COLLECTION_PATH)
    }

    getUser(userId: string) {
        return firestore.collection(this.COLLECTION_PATH).doc(userId)
    }

    create(chat: IUserCreateDTO) {
        return firestore.collection(this.COLLECTION_PATH).add(chat)
    }

    getCollection(): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
        return firestore.collection(this.COLLECTION_PATH);
    }

    getUserByUID(uid: string) {
        return firestore.collection(this.COLLECTION_PATH).where("uid", "==", uid).get();
    }

    createUserByFirebaseUser(firebaseUser:  firebase.User, authProvider: 'google' | 'local' | 'test') {
        return this.create({
            email: firebaseUser.email,
            name: firebaseUser.displayName ? firebaseUser.displayName : firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            authProvider,
            uid: firebaseUser.uid
        })
    }
}

export default new UserService()
