import React from 'react';
import LoginForm from "../components/forms/LoginForm";
import {Container, useTheme} from "@mui/material/index";
import {Box} from "@mui/material";



const LoginPage = () => {
    const theme = useTheme()

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            background: theme.palette.background.default
        }}>
            <LoginForm />
        </Box>
    );
};

export default LoginPage;
