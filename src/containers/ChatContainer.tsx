import React from 'react';
import Chat from "../components/chat/Chat";
import {Card, Typography} from "@mui/material";
import {IChat} from "../models/IChat";
import {useTheme} from "@mui/material/index";

interface IChatContainerProps {
    chat: IChat | null
}

const ChatContainer:React.FC<IChatContainerProps> = ({chat}) => {


    const theme = useTheme()
    return (
        <>
            {chat ? <Chat chat={chat}/> : (
                <Card sx={{m: 2, p: 3, background: theme.palette.myBackground.card}}>
                    <Typography variant={"h5"} color={theme.palette.text.primary}>Please select chat!</Typography>
                </Card>
            )}
        </>
    );
};

export default ChatContainer;
