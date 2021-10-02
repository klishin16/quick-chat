import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@emotion/react";


const theme = createTheme({
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

function App() {


    return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            {/*<Navbar />*/}
            <AppRouter />
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
