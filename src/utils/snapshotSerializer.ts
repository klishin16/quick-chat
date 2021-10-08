import firebase from "firebase/compat";

export const snapshotSerializer = <Data>(doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
    return {
        id: doc.id,
        ...doc.data()
    } as unknown as Data
}
export const documentSnapshotSerializer = <Data>(doc:  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
    return {
        id: doc.id,
        ...doc.data()
    } as unknown as Data
}
