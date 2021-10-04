import React from 'react';
import {Avatar, Grid, ListItem, Paper, Typography} from "@mui/material";
import {IMessage} from "../models/IMessage";

interface IMessageViewProps {
    message: IMessage
}

const Message:React.FC<IMessageViewProps> = ({message}) => {
    return (
        <ListItem>
            <Paper elevation={1} variant={"outlined"}  sx={{
                width: 'max-content',
                borderRadius: 3
            }}>
                <Grid
                    container
                    flexDirection={'row'}
                    alignItems={'center'}
                    px={1} sx={{
                    width: '100%'
                }}>
                    <Grid item mr={2}>
                        <Avatar alt="Sender logo" src={message.photoUrl!} />
                    </Grid>
                    <Grid item flexDirection={"column"} mr={2}>
                        <Typography variant={"body2"} color={"#ba68c8"}>{message.displayName}</Typography>
                        <Typography variant={"subtitle1"}>{message.text}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </ListItem>
    );
};

export default Message;
