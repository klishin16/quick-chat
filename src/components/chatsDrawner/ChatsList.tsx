import {IChat} from "../../models/IChat";
import React from "react";
import {Box, List, ListItem, ListItemText, ListSubheader, Skeleton} from "@mui/material";

interface IChatListProps {
    chatListTitle: string
    chatList: IChat[] | undefined
    loading: boolean
    renderListItem?: (chat: IChat) => JSX.Element
}

const ChatsList: React.FC<IChatListProps> = (
    {
        chatListTitle,
        chatList,
        loading,
        renderListItem = (chat) => <ListItemText>{chat.title}</ListItemText>
    }) => {

    if (loading) return (
        <Box p={1}>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </Box>
    )

    return (
        <List subheader={
            <ListSubheader component="div">
                {chatListTitle}
            </ListSubheader>
        }>
            {chatList?.length ? chatList.map((chat, index) =>
                <ListItem key={index}>
                    {renderListItem(chat)}
                </ListItem>
            ) : (
                <ListItem>
                    <ListItemText secondary={"NO CHATS"}/>
                </ListItem>
            )
            }
        </List>
    )
}

export default ChatsList
