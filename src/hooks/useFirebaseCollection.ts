import {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {snapshotSerializer} from "../utils/snapshotSerializer";

export const useFirebaseCollection = <Data>(collectionRef:  firebase.firestore.CollectionReference<firebase.firestore.DocumentData>): [Data[] | null, boolean] => {
    const [data, setData] = useState<Data[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe =  collectionRef.onSnapshot((snapshot => {
            setData(snapshot.docs.map(doc => snapshotSerializer<Data>(doc)))
        }))

        return () => {
            unsubscribe()
        }
    })

    return [data, loading]
}
