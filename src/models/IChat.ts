import firebase from "firebase/compat";

export interface IChat {
    id?: string | null;
    title: string;
    ownerUid: string | undefined;
    createdAt: firebase.firestore.FieldValue
}

export type IChatCreateDTO = Partial<IChat>

export type IChatUpdateDTO = Partial<IChat>
