import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "firebase/firestore";
import "firebase/auth"
import AppLoader from "./components/AppLoader";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles";
import {ChatDrawerProvider} from "./contexts/ChatDrawerContext";
import {NotificationProvider} from "./contexts/NotificationContext";
import {AuthProvider} from "./contexts/AuthContext";
import {PaletteMode} from "@mui/material";
import {grey} from "@mui/material/colors";


declare module '@mui/material/styles' {
    interface Palette {
        myBackground: {
            card: React.CSSProperties['color'];
        }
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        myBackground: {
            card: React.CSSProperties['color'];
        }
    }
}

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#5664d2'
                },
                divider: 'rgba(0, 0, 0, 0.12)',
                text: {
                    primary: '#172b4d',
                    secondary: grey[800],
                },
                background: {
                    default: 'whitesmoke'
                },
                myBackground: {
                    card: '#fff'
                }

            }
            : {
                // palette values for dark mode
                myBackground: {
                    card: '#293142'
                },
                background: {
                    default: '#1c2531',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#919eab'
                },
                primary: {
                    main: '#01ab56'
                },
                divider: 'rgba(145, 158, 171, 0.24)'

            }),
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(',')
    }
});


export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(mode))), [mode]);


    return (
        <AuthProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <NotificationProvider>
                        <ChatDrawerProvider>
                            <BrowserRouter>
                                <AppLoader/>
                                <AppRouter/>
                            </BrowserRouter>
                        </ChatDrawerProvider>

                    </NotificationProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AuthProvider>
    );
}

export default App;
