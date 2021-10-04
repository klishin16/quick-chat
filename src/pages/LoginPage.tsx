import React from 'react';
import LoginForm from "../components/forms/LoginForm";
import {Container} from "@mui/material";

const LoginPage = () => {
    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <LoginForm />
        </Container>
    );
};

export default LoginPage;
