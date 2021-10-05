import React from 'react';
import RegisterForm from "../components/forms/RegisterForm";
import {Container} from "@mui/material/index";



const RegisterPage = () => {
    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <RegisterForm />
        </Container>
    );
};

export default RegisterPage;
