import {FunctionComponent} from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";

export enum Routes {
    LOGIN = '/login',
    REGISTER = '/register',
    MAIN_PAGE = '/app',
    CHAT = '/app/chat',
    PROFILE = '/app/profile',
}

interface IRoute {
    path: Routes;
    component: FunctionComponent;
    exact: boolean;
}

export const publicRoutes: IRoute[] = [
    {
        path: Routes.LOGIN,
        component: LoginPage,
        exact: true
    },
    {
        path: Routes.REGISTER,
        component: RegisterPage,
        exact: true
    }
]

export const privateRoutes: IRoute[] = [
    {
        path: Routes.MAIN_PAGE,
        component: MainPage,
        exact: false
    }
]
