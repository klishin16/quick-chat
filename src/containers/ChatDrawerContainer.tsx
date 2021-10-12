import React from 'react';
import {ChatDrawerActionsEnum, useChatDrawer} from "../contexts/ChatDrawerContext";
import {Box, Divider, Drawer, IconButton, styled} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {Typography, useTheme} from "@mui/material/index";


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ChatDrawerContainer: React.FC = ({children}) =>{
    const {state, dispatch} = useChatDrawer()
    const {isFixed, isOpen} = state

    const drawerCloseHandler = () => {
        dispatch({type: ChatDrawerActionsEnum.TOGGLE_OPEN, payload: false})
    }

    const theme = useTheme()

    return isFixed ? (
        <Box sx={{
            boxSizing: "border-box",
            height: '100%',
            boxShadow: 1,
            background: theme.palette.myBackground.card,
            borderTop: 1,
            borderColor: theme.palette.divider
        }}>
            {children}
        </Box>
    ) : (
        <Drawer
            sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                boxShadow: 1,
            }}
            hideBackdrop={false}
            open={isOpen}
            onClose={drawerCloseHandler}

        >
            <DrawerHeader sx={{pr: 2, display: 'flex', justifyContent: 'space-between'}}>
                <IconButton onClick={() => dispatch({type: ChatDrawerActionsEnum.TOGGLE_OPEN, payload: !isOpen})}>
                    <ChevronLeftIcon/>
                </IconButton>
                <Typography>BACK</Typography>
            </DrawerHeader>
            <Divider/>
            {children}
        </Drawer>
    )
};
export default ChatDrawerContainer;
