import {AppBar, Box, Button, createTheme, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu"
import React from 'react';
import {ThemeProvider} from "styled-components";


const Navbar = () => {
    return (
        <ThemeProvider
            theme={createTheme({
                components: {
                    MuiAppBar: {
                        defaultProps: {
                            enableColorOnDark: true,
                        },
                    },
                },
            })}
        >
            <Box sx={{flexGrow: 1}}>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
};

export default Navbar;
