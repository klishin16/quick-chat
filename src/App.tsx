import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {ThemeProvider} from "@emotion/react";
import "firebase/firestore";
import "firebase/auth"
import {createTheme, responsiveFontSizes} from "@mui/material";
import AppLoader from "./components/AppLoader";


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
    // console.log(process.env.)

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppLoader />
                <AppRouter/>
            </BrowserRouter>

        </ThemeProvider>
    );
}

export default App;
