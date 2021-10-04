import React, {FormEvent, useContext, useState} from 'react';
import {Box, Button, Divider, Grid, List, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";
import {firestore} from "../index";
import {AuthContext} from "../context/AuthContext";

const Chat: React.FC = () => {
    const user = useContext(AuthContext)
    const [newMessageText, setNewMessageText] = useState('');

    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        await firestore.collection('messages').add({
            uid: user?.uid,
            displayName: user?.displayName,
            photoUrl: user?.photoURL,
            text: newMessageText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setNewMessageText('')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendMessage()
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>

            <Grid container p={2} sx={{boxSizing: "border-box", width: '100%'}} flexDirection={"column"}>
                <Typography variant={"h4"}>Chat name</Typography>
                <Typography variant={"subtitle1"}>Chat description with some useful information</Typography>
            </Grid>
            <Divider />
            <List sx={{
                overflowY: 'auto',
                height: '63vh'
            }}>
                {messages && messages.map((message, index) =>
                    <Message key={index} message={message}/>
                )}
            </List>
            <Divider />
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
                        endIcon={<SendIcon />}
                        onClick={sendMessage}
                    >Send</Button>
                </Grid>
            </form>
        </Box>
    );
};

export default Chat;
