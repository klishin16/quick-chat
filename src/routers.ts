import {FunctionComponent} from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ProfileContainer from "./containers/ProfileContainer";

export enum Routes {
    LOGIN = '/login',
    REGISTER = '/register',
    CHAT = '/',
    PROFILE = '/profile',
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
        component: MainPage
    }
]
