import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Backdrop, CircularProgress} from "@mui/material";

const AppLoader = () => {
    const user = useContext(AuthContext)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={false}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default AppLoader;
