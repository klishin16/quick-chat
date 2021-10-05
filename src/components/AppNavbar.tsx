import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {AuthService} from "../services/AuthService";
import {AppBar, createStyles, IconButton, Menu, MenuItem, Slide, Theme, Toolbar, Typography} from "@mui/material/index";
import {makeStyles} from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle'
import {ChatDrawerActionsEnum, useChatDrawer} from "../context/ChatDrawerContext";


export const NAVBAR_HEIGHT = 65;


const useStyles = makeStyles(({palette, spacing}: Theme) => createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: spacing(2)
        },
        title: {
            flexGrow: 1,
        },
        drawer: {
            width: 300,
        },
        fullList: {
            width: 'auto',
        }
    })
)


interface IAppBarProps {

}
const AppNavbar: React.FC<IAppBarProps> = () => {
    const user = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {state, dispatch} = useChatDrawer()
    const {isFixed, isOpen} = state


    const menuToggleHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeHandler = () => {
        setAnchorEl(null);
    };

    const logoutHandler = async () => {
        await AuthService.logout()
    };

    const chatDrawerToggleHandler = () => {
        console.log('ds')
        dispatch({type: ChatDrawerActionsEnum.TOGGLE_OPEN, payload: !isOpen})
    }

    return (
        <Slide in={!!user} direction='down' >
            <AppBar position={'static'} color={"secondary"}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                        onClick={chatDrawerToggleHandler}
                                sx={{
                                    mr: 2,
                                    display: {
                                        xs: 'block',
                                        sm: 'none'
                                    }
                                }}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        QUICK CHAT
                    </Typography>
                    <Typography sx={{display: {xs: 'none', sm: 'block'}}} variant="h5" component="div">
                        {user?.email}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={menuToggleHandler}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={closeHandler}
                        >
                            <MenuItem onClick={closeHandler}>Profile</MenuItem>
                            <MenuItem onClick={closeHandler}>My account</MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Slide>
    );
};

export default AppNavbar;
