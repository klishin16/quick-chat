import React from 'react';
import {IMessage} from "../../models/IMessage";
import {Avatar, Box, Grid, ListItem, Paper, Typography} from "@mui/material";
import {IUser} from "../../models/IUser";
import {useTheme} from "@mui/material/index";

interface IMessageViewProps {
    message: IMessage;
    currentUser: IUser;
}

const Message: React.FC<IMessageViewProps> = ({message, currentUser}) => {


    const theme = useTheme()
    return (
        <ListItem sx={{
            justifyContent: message.uid === currentUser.uid ? 'flex-end' : 'flex-start'
        }}>
            <Paper variant={"outlined"} sx={{
                width: 'max-content',
                borderRadius: 2,
                background: theme.palette.myBackground.card,
                // borderColor: theme.palette.primary.main
            }}>
                <Grid
                    container
                    flexDirection={'row'}
                    alignItems={'center'}
                    px={1}
                    sx={{
                        width: '100%'
                    }}
                >
                    <Grid item mr={2}>
                        <Avatar alt="Sender logo" src={message.photoUrl!}/>
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
