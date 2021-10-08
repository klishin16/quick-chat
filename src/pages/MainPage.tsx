import React, {useEffect, useState} from 'react';
import {NAVBAR_HEIGHT} from "../components/AppNavbar";
import AppChatsDrawer from "../components/chatsDrawner/AppChatsDrawer";
import Chat from "../components/chat/Chat";
import ChatCreationModalForm from "../components/forms/ChatCreationModalForm";
import {Grid, Typography, useTheme} from "@mui/material/index";
import {ChatDrawerActionsEnum, useChatDrawer} from "../contexts/ChatDrawerContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {IChat} from "../models/IChat";
import {Box} from "@mui/material";
import {Route} from "react-router-dom";
import {Routes} from "../routers";
import ProfileContainer from "../containers/ProfileContainer";


const MainPage = () => {
    const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
    const {state, dispatch} = useChatDrawer()
    const {isFixed} = state
    const {width} = useWindowDimensions();
    useEffect(() => {
        dispatch({type: ChatDrawerActionsEnum.TOGGLE_FIXED, payload: theme.breakpoints.values.sm < width})
    }, [dispatch, width])


    const [chat, setChat] = useState<IChat | null>(null);


    const theme = useTheme()
    return (
        <>
            <Route path={Routes.CHAT} exact={true}>
                <Box className={'chat-page'}>
                    <ChatCreationModalForm isOpen={isCreateChatModalOpen} onClose={() => setIsCreateChatModalOpen(false)}/>

                    <Grid className={'chat-page-container'} container sx={{
                        height: window.innerHeight - NAVBAR_HEIGHT,
                        flexDirection: isFixed ? 'row' : 'column'
                    }}>
                        {isFixed ?
                            <>
                                <Grid item width={240} flexGrow={0}>
                                    <AppChatsDrawer
                                        chatCreationModalFormHandler={() => setIsCreateChatModalOpen(true)}
                                        setChatHandler={setChat}
                                    />
                                </Grid>
                                <Grid item flexGrow={1}>
                                    {chat ? <Chat chat={chat}/> : <Typography>Please select chat!</Typography>}
                                </Grid>
                            </>
                            :
                            <>
                                <AppChatsDrawer
                                    chatCreationModalFormHandler={() => setIsCreateChatModalOpen(true)}
                                    setChatHandler={setChat}
                                />
                                <Grid item width={'100%'}>
                                    {chat ? <Chat chat={chat}/> : <Typography>Please select chat!</Typography>}
                                </Grid></>
                        }

                    </Grid>
                </Box>
            </Route>
            <Route path={Routes.PROFILE} exact>
                <ProfileContainer />
            </Route>
        </>
    );
};

export default MainPage;
