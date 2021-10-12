import React, {useContext, useRef} from 'react';

import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {ChatDrawerActionsEnum, useChatDrawer} from "../../contexts/ChatDrawerContext";
import {Box, Typography, useTheme} from "@mui/material/index";
import {AuthContext} from "../../contexts/AuthContext";
import {UserChatService} from "../../services/UserChatService";
import ChatsList from './ChatsList'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {ChatService} from "../../services/ChatService";
import {NotificationContext, NotificationType} from "../../contexts/NotificationContext";
import {IChat} from "../../models/IChat";
import {IUser} from "../../models/IUser";
import ChatDrawerContainer from "../../containers/ChatDrawerContainer";
import { useHistory } from 'react-router-dom';
import {Routes} from "../../routers";
import {ListAltOutlined} from "@mui/icons-material";

export const CHATS_DRAWER_WIDTH = 240;


interface IDrawerProps {
    chatCreationModalFormHandler: () => void
    setChatHandler: (chat: IChat) => void
}

const AppChatsDrawer: React.FC<IDrawerProps> = ({chatCreationModalFormHandler, setChatHandler}) => {
    const history = useHistory();
    const {user} = useContext(AuthContext)
    const userId = useRef(user!.id)
    const [userChats, userChatsLoading] = useCollectionData(UserChatService.getUserChats(userId.current), {idField: 'id'})
    const [freeChats, freeChatsLoading] = useCollectionData(ChatService.getAllChats(), {idField: 'id'})

    const {addNotification} = useContext(NotificationContext)
    const addChatHandler = (user: IUser, chat: IChat) => {
        UserChatService.addUserToChat(user, chat).then(() => addNotification(NotificationType.SUCCESS, 'Chat added!'))
    }
    const removeChatHandler = (user: IUser, chat: IChat) => {
        UserChatService.removeUserFromChat(user, chat).then(() => addNotification(NotificationType.SUCCESS, 'Chat removed!'))
    }
    const selectChatHandler = (chat: IChat) => {
        setChatHandler(chat)
        history.push(Routes.CHAT)
    }


    const theme = useTheme()
    return (
        <ChatDrawerContainer>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={chatCreationModalFormHandler}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography color={theme.palette.text.primary}>CREATE CHAT</Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider/>
            <nav aria-label="secondary mailbox folders">
                <ChatsList
                    chatListTitle={'USER CHATS'}
                    chatList={userChats as IChat[]}
                    loading={userChatsLoading}
                    renderListItem={chat => (
                        <>
                            <IconButton onClick={() => removeChatHandler(user!, chat)}><CloseIcon/></IconButton>
                            <ListItemButton onClick={() => selectChatHandler(chat)}>
                                <Typography variant={"body1"} color={theme.palette.text.primary}>{chat.title}</Typography>
                            </ListItemButton>
                        </>
                    )}
                />

                <Divider/>

                <ChatsList
                    chatListTitle={'AVAILABLE CHATS'}
                    chatList={freeChats as IChat[]}
                    loading={freeChatsLoading}
                    renderListItem={chat => (
                        <>
                            <IconButton onClick={() => addChatHandler(user!, chat)}><AddIcon/></IconButton>
                            <ListItemButton>
                                <Typography variant={"body1"} color={theme.palette.text.primary}>{chat.title}</Typography>
                            </ListItemButton>
                        </>
                    )}
                />
            </nav>
        </ChatDrawerContainer>
    );
};

export default AppChatsDrawer;
