import {Button, Card, CardActions, CardContent, TextField, Typography} from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from "../routers";

interface ILoginProps {
    onSubmit: () => void;
}

const LoginForm: React.FC<ILoginProps> = ({onSubmit}) => {

    return (
        <Card sx={{minWidth: 275, width: 340}} style={{marginTop: '30vh'}}>
            <CardContent>
                <Typography variant="h5" component="div" align={"center"}>
                    LOGIN
                </Typography>
                <TextField
                    label={'Email'}
                    placeholder={'Enter email'}
                    variant="standard"
                    size={"small"}
                    type={"email"}
                    fullWidth
                />
                <TextField
                    label={'Password'}
                    placeholder={'Enter password'}
                    variant="standard"
                    size={"small"}
                    type={"password"}
                    fullWidth
                    margin={"normal"}
                />
            </CardContent>
            <CardActions style={{display: "flex", alignItems: 'center'}}>
                <Button
                    size={"medium"}
                    variant={"text"}
                >LOGIN</Button>
                <Typography>or <Link to={Routes.REGISTER}>register now</Link></Typography>
            </CardActions>
        </Card>
    );
};

export default LoginForm;
