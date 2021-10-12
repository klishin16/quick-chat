import React from 'react';
import {Box, Card, Grid, IconButton, Typography, useTheme} from "@mui/material/index";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import {ColorModeContext} from "../App";

const ProfileContainer = () => {
    const colorMode = React.useContext(ColorModeContext);


    const theme = useTheme()
    return (
        <div>
            <Card sx={{m: 2, p: 3, background: theme.palette.myBackground.card}}>
                <Typography variant={"h5"}>Profile view</Typography>
            </Card>
            <Card sx={{m: 2, p: 3, background: theme.palette.myBackground.card}}>
                <Typography sx={{mb: 3}} variant={"h5"}>Settings</Typography>

                <Grid container>
                    <Grid item display={"flex"} justifyContent={"space-between"} alignItems={"center"} width={'100%'}>
                        <div>
                            <Typography variant={"body1"}>Toggle theme mode</Typography>
                        </div>
                        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default ProfileContainer;
