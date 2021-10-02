import React from 'react';
import LoginForm from "../components/LoginForm";
import {Container} from "@material-ui/core";

const LoginPage = () => {
    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <LoginForm onSubmit={() => {}} />
        </Container>
    );
};

export default LoginPage;
