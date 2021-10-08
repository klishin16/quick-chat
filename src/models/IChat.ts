import firebase from "firebase/compat";

export interface IChat {
    id: string;
    title: string;
    description: string
    ownerUid: string | undefined;
    createdAt: firebase.firestore.FieldValue
}

export interface IChatCreateDTO {
    title: string;
    description: string;
    ownerUid: string | undefined;
    createdAt: firebase.firestore.FieldValue
}

export type IChatUpdateDTO = Partial<IChat>
