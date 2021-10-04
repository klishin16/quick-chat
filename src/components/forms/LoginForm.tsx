import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from "../../routers";
import 'firebase/firestore'
import 'firebase/auth'
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {AuthService} from "../../services/AuthService";
import {useRequest} from "../../hooks/useRequest";
import {Controller, SubmitHandler, useForm} from "react-hook-form";


interface IFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const {requestError, loading, requestWrapper} = useRequest()
    const {handleSubmit, control} = useForm()

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        requestWrapper(() => AuthService.signInWithEmailAndPassword(data.email, data.password),
            () => console.log('Successfully registered with local credentials!')
        )
    }

    const googleLoginHandler = async () => {
        await AuthService.signInWithGoogle()
            .then(() => console.log('Signed in by Google Auth!'))
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{
                marginTop: '30vh',
                minWidth: 275,
                width: {
                    xs: '100%',
                    sm: 340
                }
            }}>
                <CardContent sx={{padding: 2}}>
                    <Typography variant="h5" component="div" align={"center"} style={{marginBottom: '2vh'}}>
                        LOGIN
                    </Typography>

                    <Button
                        size={"medium"}
                        variant={"contained"}
                        color={"primary"}
                        sx={{
                            marginBottom: '1vh',
                            width: '100%'
                        }}
                        onClick={googleLoginHandler}
                    >LOGIN WITH GOOGLE</Button>

                    <Controller //name
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                value={value} onChange={onChange} type={"email"} //form properties
                                label={'Email'}
                                placeholder={'Enter your email'}
                                variant="standard"
                                size={"small"}
                                error={!!error || !!requestError} //TODO
                                helperText={error ? error.message : requestError} // TODO
                                fullWidth
                                style={{marginBottom: '1vh'}}
                            />
                        )}
                        rules={{required: 'First name required'}}
                    />

                    <Controller //password
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                value={value} onChange={onChange} error={!!error}
                                helperText={error ? error.message : null}
                                label={'Password'}
                                placeholder={'Enter password'}
                                variant="standard"
                                type={"password"}
                                size={"small"}
                                fullWidth
                                style={{marginBottom: '1vh'}}
                            />
                        )}
                        rules={{required: 'Password required'}}
                    />
                </CardContent>
                <CardActions sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "column"
                    },
                    padding: 2
                }}>

                    <Button
                        type={"submit"}
                        size={"medium"}
                        variant={"outlined"}
                        color={"success"}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "100%"
                            },
                            marginBottom: '1vh'
                        }}
                    >LOGIN</Button>
                    <Typography variant={"subtitle1"}>Don't have an account? <Link
                        to={Routes.REGISTER}>Register</Link> now.</Typography>
                </CardActions>
            </Card>
        </form>
    );
};

export default LoginForm;
