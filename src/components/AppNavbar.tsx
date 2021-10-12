import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
import {
    AppBar,
    createStyles,
    IconButton,
    Menu,
    MenuItem,
    Slide,
    Theme,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material/index";
import {makeStyles} from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle'
import {ChatDrawerActionsEnum, useChatDrawer} from "../contexts/ChatDrawerContext";
import {useHistory} from 'react-router-dom';
import {Routes} from "../routers";


export const NAVBAR_HEIGHT = 65;


interface IAppBarProps {

}


const AppNavbar: React.FC<IAppBarProps> = () => {
    const {user, isAuthenticated} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {state, dispatch} = useChatDrawer()
    const {isOpen} = state


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


    const theme = useTheme()
    const history = useHistory()
    return (
        <Slide in={isAuthenticated} direction='down' >
            <AppBar position={'static'} sx={{background: theme.palette.myBackground.card}}>
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
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} color={theme.palette.primary.main}>
                        QUICK CHAT
                    </Typography>
                    <Typography sx={{display: {xs: 'none', sm: 'block'}}} variant="h5" component="div" color={theme.palette.text.primary}>
                        {user?.email}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={menuToggleHandler}
                            color={"info"}
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
                            <MenuItem onClick={() => {
                                closeHandler()
                                history.push(Routes.PROFILE)
                            }}>
                                Profile & Settings
                            </MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Slide>
    );
};

export default AppNavbar;
