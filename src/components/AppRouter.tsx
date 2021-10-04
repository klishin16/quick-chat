import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes, Routes} from "../routers";
import {AuthContext} from "../context/AuthContext";


const AppRouter = () => {
    const user = useContext(AuthContext)

    return user ?  (
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
