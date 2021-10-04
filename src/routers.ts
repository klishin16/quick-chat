import {FunctionComponent} from "react";
import Chat from "./components/Chat";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";

export enum Routes {
    LOGIN = '/login',
    REGISTER = '/register',
    CHAT = '/chat',
}

interface IRoute {
    path: Routes;
    component: FunctionComponent
}

export const publicRoutes: IRoute[] = [
    {
        path: Routes.LOGIN,
        component: LoginPage
    },
    {
        path: Routes.REGISTER,
        component: RegisterPage
    }
]

export const privateRoutes: IRoute[] = [
    {
        path: Routes.CHAT,
        component: ChatPage
    }
]
