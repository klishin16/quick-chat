import {useState} from "react";
import firebase from "firebase/compat";


export const useFirebaseRequest = (): [firebase.firestore.DocumentData | undefined, boolean, string | null, Function] => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<firebase.firestore.DocumentData | undefined>(undefined)
    const [error, setError] = useState<string | null>(null)

    const requestWrapper = (request: () => Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>, successCallback?: Function): Promise<any> => {
        setLoading(true)
        return request()
            .then(response => {
                setData(response)
                if (successCallback) successCallback()
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    return [
        data,
        loading,
        error,
        requestWrapper
    ]
}
