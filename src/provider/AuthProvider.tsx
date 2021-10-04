import React, {useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {auth} from "../index";
import firebase from "firebase/compat";


export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        }, error => console.log(error));
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
