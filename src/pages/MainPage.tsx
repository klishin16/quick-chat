import React, {useEffect, useState} from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {Routes} from "../routers";
import ProfileContainer from "../containers/ProfileContainer";
import ChatContainer from "../containers/ChatContainer";
import {Box, Grid, Typography, useTheme} from "@mui/material/index";
import AppNavbar, {NAVBAR_HEIGHT} from "../components/AppNavbar";
import ChatCreationModalForm from "../components/forms/ChatCreationModalForm";
import AppChatsDrawer from "../components/chatsDrawner/AppChatsDrawer";
import Chat from "../components/chat/Chat";
import {ChatDrawerActionsEnum, useChatDrawer} from "../contexts/ChatDrawerContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {IChat} from "../models/IChat";


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
        <div>
            <AppNavbar />

            <Box className={'chat-page'} sx={{
                background: theme.palette.background.default
            }}>
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
                                <Switch>
                                    <Route path={Routes.CHAT} exact>
                                        <ChatContainer chat={chat} />
                                    </Route>
                                    <Route path={Routes.PROFILE} component={ProfileContainer} />
                                </Switch>
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
        </div>
    );
};

export default MainPage;
