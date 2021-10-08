import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes, Routes} from "../routers";
import {AuthContext} from "../contexts/AuthContext";


const AppRouter = () => {
    const {isAuthenticated} = useContext(AuthContext)

    return isAuthenticated ?  (
        <Switch>
            {privateRoutes.map(({path, component}, index) =>
                <Route key={index} path={path} component={component} exact={true} />
            )}
            <Redirect to={Routes.CHAT} />
        </Switch>
    ): (
        <Switch>
            {publicRoutes.map(({path, component}, index) =>
                <Route key={index} path={path} component={component} exact={true} />
            )}
            <Redirect to={Routes.LOGIN} />
        </Switch>
    );
};

export default AppRouter;
