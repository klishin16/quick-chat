import {FunctionComponent} from "react";
import Chat from "./components/Chat";
import LoginPage from "./pages/LoginPage";

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
    }
]

export const privateRoutes: IRoute[] = [
    {
        path: Routes.CHAT,
        component: Chat
    }
]
