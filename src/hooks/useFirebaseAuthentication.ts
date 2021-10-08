import {useEffect, useState} from "react";
import {auth} from "../index";
import firebase from "firebase/compat";
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";
import {documentSnapshotSerializer, snapshotSerializer} from "../utils/snapshotSerializer";


const useFirebaseAuthentication = () => {
    // const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadOrCreateAndLoadUser = (firebaseUser: firebase.User) => {
        setAuthLoading(true)
        UserService.getUserByUID(firebaseUser?.uid!)
            .then(resp => {
                if (resp.docs.length) { //если в базе данных существует профиль пользователя
                    setUser(snapshotSerializer(resp.docs.pop()!)) //this is fine :)
                    setAuthLoading(false)
                    setIsAuthenticated(true)
                    console.log('auth state changed! (Created and Authenticated)')
                } else
                    UserService.createUserByFirebaseUser(firebaseUser, 'test')
                        .then(resp2 => {
                            resp2.get()
                                .then(userData => {
                                    setUser(documentSnapshotSerializer(userData))
                                    setAuthLoading(false)
                                    setIsAuthenticated(true)
                                    console.log('auth state changed! (Created and Authenticated)')
                                })
                        })
            })
    }

    useEffect(() =>{
        console.log('efect')
        const unlisten = auth.onAuthStateChanged(
            firebaseUser => {
                console.log('auth state changing...')
                if (firebaseUser) {
                    loadOrCreateAndLoadUser(firebaseUser)
                } else {
                    setIsAuthenticated(false)
                    console.log('auth state changed! (Not authenticated)')
                }
            }, error => console.log(error));

        return () => {
            unlisten();
        }
    }, []);



    return {user, authLoading, isAuthenticated}
}

export default useFirebaseAuthentication;
