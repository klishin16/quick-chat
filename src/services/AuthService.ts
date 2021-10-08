import {auth} from "../index";
import firebase from "firebase/compat";
import {ILoginDTO, IRegisterDTO} from "../models/IAuth";


class AuthService {
    signInWithEmailAndPassword = async (loginDTO: ILoginDTO) => {
        try {
            return  auth.signInWithEmailAndPassword(loginDTO.email, loginDTO.password);
        } catch (err: any) {
            console.log('AuthService -> signInWithEmailAndPassword row error: ', err)
            throw err.message
        }
    };

    signInWithGoogle = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        try {
            return auth.signInWithPopup(googleProvider);
        } catch (err: any) {
            console.log('AuthService -> signInWithGoogle row error: ', err)
            throw err.message
        }
    };

    registerWithCredentials = async (credentials: IRegisterDTO) => {
        try {
            return auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
        } catch (err: any) {
            console.log('AuthService -> registerWithCredentials row error: ', err)
            throw err.message
        }
    };

    sendPasswordResetEmail = async (email: string) => {
        try {
            await auth.sendPasswordResetEmail(email);
            alert("Password reset link sent!");
        } catch (err: any) {
            console.log('AuthService row error: ', err)
            throw err.message
        }
    }

    logout = () => {
        auth.signOut().then(() => console.log('Logged out!'));
    };
}

export default new AuthService()
