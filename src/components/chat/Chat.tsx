import React, {FormEvent, useContext, useEffect, useRef, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {AuthContext} from "../../contexts/AuthContext";
import {Box, Button, Divider, Grid, List, TextField} from "@mui/material";
import ChatHeader from "./ChatHeader";
import {IChat} from "../../models/IChat";
import MessageService from "../../services/MessageService";
import {IUser} from "../../models/IUser";


interface IChatProps {
    chat: IChat
}

const Chat: React.FC<IChatProps> = ({chat}) => {
    const {user, isAuthenticated} = useContext(AuthContext)
    const [newMessageText, setNewMessageText] = useState('');

    const [messages, loading] = useCollectionData(MessageService.getChatMessagesCollection(chat))


    const handleSubmit = (e: FormEvent | MouseEvent) => {
        e.preventDefault() //TODO

        const sendMessage = async (user: IUser, chat: IChat) => {
            await MessageService.createChatMessage(user, chat, newMessageText)
            setNewMessageText('')
        }

        if (user && isAuthenticated) {
            console.log('user:', user)
            sendMessage(user, chat).then(() => console.log('Message send!'))
        } else {
            console.log('Some problems with user authentication')
        }
    }

    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (bottomRef.current) bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    useEffect(() => {
        return () => {
            scrollToBottom()
        };
    }, [messages]);


    return (
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>

            <ChatHeader
                title={chat.title}
                description={chat.description}/>

            <List sx={{
                overflowY: 'auto',
                height: '63vh'
            }}>
                {messages && messages.map((message, index) =>
                    <Message key={index} message={message} currentUser={user!}/>
                )}
                <div ref={bottomRef} className="list-bottom"/>
            </List>
            <Divider/>
            <form onSubmit={handleSubmit}>
                <Grid container px={1} py={3}>
                    <Box mr={1} sx={{flexGrow: 1}}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size={"small"}
                            color={"secondary"}
                            fullWidth
                            value={newMessageText}
                            onChange={e => setNewMessageText(e.target.value)}
                        />
                    </Box>
                    <Button
                        sx={{flexGrow: 0}}
                        variant={"outlined"}
                        color={"secondary"}
                        size={"small"}
                        endIcon={<SendIcon/>}
                        onClick={handleSubmit}
                    >Send</Button>
                </Grid>
            </form>
        </Box>
    );
};

export default Chat;
