import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from '@material-ui/core';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Routes} from "../routers";
import 'firebase/firestore'
import 'firebase/auth'
import {FirebaseContext} from "../index";
import firebase from "firebase/compat";

interface ILoginProps {
    onSubmit: () => void;
}

const LoginForm: React.FC<ILoginProps> = ({onSubmit}) => {
    const {auth} = useContext(FirebaseContext)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth?.signInWithPopup(provider)
        console.log(user)
    }

    return (
        <Card sx={{
            marginTop: '30vh',
            minWidth: 275,
            width: {
                xs: '100%',
                sm: 340
            }
        }}>
            <CardContent>
                <Typography variant="h5" component="div" align={"center"}>
                    LOGIN
                </Typography>

                <Button
                    size={"medium"}
                    variant={"outlined"}
                    color={"info"}
                    sx={{
                        marginTop: '1vh',
                        width: '100%'
                    }}
                    onClick={login}
                >LOGIN WITH GOOGLE</Button>

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
            <CardActions sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row"
                }
            }
            }>

                <Button
                    size={"medium"}
                    variant={"outlined"}
                    color={"success"}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: 'auto'
                        }
                    }}
                >LOGIN</Button>
                <Typography>or <Link to={Routes.REGISTER}>Sign up</Link></Typography>
            </CardActions>
        </Card>
    );
};

export default LoginForm;
