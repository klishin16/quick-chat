import React from 'react';
import Navbar, {NAVBAR_HEIGHT} from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Drawer from "../components/Drawer";
import Chat from "../components/Chat";
import {Box} from "@mui/material";

const ChatPage = () => {
    return (
        <div>
            <Navbar/>
            <Grid container sx={{
                height: window.innerHeight - NAVBAR_HEIGHT
            }}>
                <Grid item width={240} flexGrow={0} flexShrink={1}>
                    <Drawer/>
                </Grid>
                <Grid item flexGrow={1} flexShrink={0}>
                    <Chat/>
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatPage;
