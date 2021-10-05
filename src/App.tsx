import React, {useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "firebase/firestore";
import "firebase/auth"
import AppLoader from "./components/AppLoader";
import {AuthProvider} from "./provider/AuthProvider";
import AppNavbar from "./components/AppNavbar";
import AppChatsDrawer from "./components/AppChatsDrawer";
import {Button, createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/index";
import {ChatDrawerProvider} from "./context/ChatDrawerContext";




let theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(',')
    }
})
theme = responsiveFontSizes(theme)



function App() {

    return (
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <ChatDrawerProvider>
                        <AppNavbar />
                        <AppLoader/>
                        <BrowserRouter>
                            <AppRouter/>
                        </BrowserRouter>
                    </ChatDrawerProvider>
                </ThemeProvider>
            </AuthProvider>
    );
}

export default App;
