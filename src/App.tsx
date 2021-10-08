import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "firebase/firestore";
import "firebase/auth"
import AppLoader from "./components/AppLoader";
import AppNavbar from "./components/AppNavbar";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/index";
import {ChatDrawerProvider} from "./contexts/ChatDrawerContext";
import {NotificationProvider} from "./contexts/NotificationContext";
import {AuthProvider} from "./contexts/AuthContext";


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
                <NotificationProvider>
                    <BrowserRouter>
                    <ChatDrawerProvider>
                        <AppNavbar/>
                        <AppLoader/>

                            <AppRouter/>

                    </ChatDrawerProvider>
                    </BrowserRouter>
                </NotificationProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
