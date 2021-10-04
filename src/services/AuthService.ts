import {auth} from "../index";
import firebase from "firebase/compat";
import {UserService} from "./UserService";
import {IRegisterDTO} from "../models/IAuth";

export class AuthService {
    static signInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err: any) {
            console.log('AuthService row error: ', err)
            throw err.message
        }
    };

    static signInWithGoogle = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        try {
            const res = await auth.signInWithPopup(googleProvider);
            const user = res.user;
            const query = await UserService.getAll()
                .where("uid", "==", user!.uid)
                .get();
            if (query.docs.length === 0) {
                await UserService.create({
                    uid: user!.uid,
                    name: user!.displayName,
                    authProvider: "google",
                    email: user!.email,
                });
            }
        } catch (err: any) {
            console.log('AuthService row error: ', err)
            throw err.message
        }
    };

    static registerWithCredentials = async (credentails: IRegisterDTO) => {
        try {
            const res = await auth.createUserWithEmailAndPassword(credentails.email, credentails.password);
            const user = res.user;
            await UserService.create({
                uid: user!.uid,
                name: credentails.name,
                email: credentails.email,
                authProvider: "local",
            })
        } catch (err: any) {
            console.log('AuthService row error: ', err)
            throw err.message
        }
    };

    static sendPasswordResetEmail = async (email: string) => {
        try {
            await auth.sendPasswordResetEmail(email);
            alert("Password reset link sent!");
        } catch (err: any) {
            console.log('AuthService row error: ', err)
            throw err.message
        }
    }

    static logout = () => {
        auth.signOut().then(() => console.log('Logged out!'));
    };
}
