import React from "react";
import useFirebaseAuthentication from "../hooks/useFirebaseAuthentication";
import {IUser} from "../models/IUser";

interface AuthContextData {
    user: IUser | null;
    authLoading: boolean;
    isAuthenticated: boolean
    logger?: () => void
}

export const AuthContext = React.createContext<AuthContextData>({
    user: null,
    authLoading: false,
    isAuthenticated: false,
});

export const AuthProvider: React.FC = ({children}) => {
   const {user, authLoading, isAuthenticated} = useFirebaseAuthentication()

    const logger = () => {
        console.log('User:', user)
        console.log('Auth:', isAuthenticated)
        console.log('AuthLoading:', authLoading)
    }



    return (
        <AuthContext.Provider value={{
            user: user,
            authLoading: authLoading,
            isAuthenticated: isAuthenticated,
            logger
        }}>
            {children}
        </AuthContext.Provider>
    );
};
