import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes, Routes} from "../routers";

const AppRouter = () => {
    const user: boolean = false // авторизация
    return user ?  (
        <Switch>
            {privateRoutes.map(({path, component}) =>
                <Route path={path} component={component} exact={true} />
            )}
            <Redirect to={Routes.CHAT} />
        </Switch>
    ): (
        <Switch>
            {publicRoutes.map(({path, component}) =>
                <Route path={path} component={component} exact={true} />
            )}
            <Redirect to={Routes.LOGIN} />
        </Switch>
    );
};

export default AppRouter;
