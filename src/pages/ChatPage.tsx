import React, {useCallback, useEffect, useState} from 'react';
import {NAVBAR_HEIGHT} from "../components/AppNavbar";
import AppChatsDrawer from "../components/AppChatsDrawer";
import Chat from "../components/Chat";
import ChatCreationModal from "../components/ChatCreationModal";
import {Button, Grid, useTheme} from "@mui/material/index";
import {ChatDrawerActionsEnum, useChatDrawer} from "../context/ChatDrawerContext";
import useWindowDimensions from "../hooks/useWindowDimensions";


const ChatPage = () => {
    const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
    const {state, dispatch} = useChatDrawer()
    const {isFixed} = state
    const {width} = useWindowDimensions();
    const theme = useTheme()

    useEffect(() => {
        dispatch({type: ChatDrawerActionsEnum.TOGGLE_FIXED, payload: theme.breakpoints.values.sm < width})
        console.log(isFixed)
    }, [width])

    return (
        <React.Fragment>
            <ChatCreationModal isOpen={isCreateChatModalOpen} onClose={() => setIsCreateChatModalOpen(false)}/>

            <Grid container sx={{
                height: window.innerHeight - NAVBAR_HEIGHT,
                flexDirection: isFixed ? 'row': 'column'
            }}>
                <Grid sx={{
                    width: isFixed ? 'auto' : 240
                }}
                      item flexGrow={0}>
                    <AppChatsDrawer/>
                </Grid>
                <Grid item flexGrow={1}>
                    <Chat/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ChatPage;
