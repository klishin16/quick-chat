import React, {useEffect} from 'react';
import {ChatService} from "../services/ChatService";
import {useFirebaseRequest} from "../hooks/useFirebaseRequest";

import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    styled
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {ChatDrawerActionsEnum, useChatDrawer} from "../context/ChatDrawerContext";
import {Box} from "@mui/material/index";

export const CHATS_DRAWER_WIDTH = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ChatsDrawerWrapper:React.FC = ({children}) => {
    const {state, dispatch} = useChatDrawer()
    const {isFixed, isOpen} = state

    const drawerCloseHandler = () => {
        console.log('here')
        dispatch({type: ChatDrawerActionsEnum.TOGGLE_OPEN, payload: !isOpen})
    }

    return isFixed ? (
        <Box>
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
            open={isOpen}
            onClose={drawerCloseHandler}

        >
            {children}
        </Drawer>
    )
}


interface IDrawerProps {

}
const AppChatsDrawer: React.FC<IDrawerProps> = () => {
    const {state, dispatch} = useChatDrawer()
    const {isFixed, isOpen} = state

    const [userChats, chatsLoading, error, requestWrapper] = useFirebaseRequest()

    const loadChats = async () => {
        requestWrapper(() => ChatService.getAllChats(), () => {
        })
    }

    useEffect(() => {
        loadChats()
    }, [])




    return (
            <ChatsDrawerWrapper>
                {!isFixed &&
                    <React.Fragment>
                        <DrawerHeader style={{display: 'block'}}>
                            <IconButton onClick={() => dispatch({type: ChatDrawerActionsEnum.TOGGLE_OPEN, payload: !isOpen})}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                    </React.Fragment>
                }
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {}}>
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="CREATE CHAT"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                <Divider/>
                <nav aria-label="secondary mailbox folders">
                    <List subheader={
                        <ListSubheader component="div">
                            AVAILABLE CHATS
                        </ListSubheader>
                    }>
                        {/*{chatsLoading ? <Box p={1}><Skeleton /><Skeleton /><Skeleton /></Box> : userChats ?*/}
                        {/*    (userChats as IChat[]).map((chat, index) =>*/}
                        {/*        <ListItem key={index} disablePadding>*/}
                        {/*            <ListItemButton>*/}
                        {/*                <ListItemText primary={chat.title}/>*/}
                        {/*            </ListItemButton>*/}
                        {/*        </ListItem>)*/}
                        {/*    :*/}
                        {/*    <ListItem>*/}
                        {/*        <ListItemIcon>*/}
                        {/*            <CloseIcon />*/}
                        {/*        </ListItemIcon>*/}
                        {/*        <ListItemText secondary={"NO CHATS"} />*/}
                        {/*    </ListItem>*/}
                        {/*}*/}
                    </List>
                </nav>
            </ChatsDrawerWrapper>
    );
};

export default AppChatsDrawer;
