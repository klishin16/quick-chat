import firebase from "firebase/compat";

export interface IMessage {
    id?: string | null;
    uid: string | undefined;
    displayName: string | null | undefined,
    photoUrl: string | null | undefined,
    text: string,
    createdAt: firebase.firestore.FieldValue
}

export interface IMessageCreateDTO {
    uid: string | undefined;
    displayName: string;
    photoUrl: string;
    text: string;
    createdAt: firebase.firestore.FieldValue
}

