import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from "../../routers";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {auth} from "../../index";
import {useRequest} from "../../hooks/useRequest";
import {AuthService} from "../../services/AuthService";


interface IFormInputs {
    email: string;
    name: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const {requestError, loading, requestWrapper} = useRequest()
    const {handleSubmit, control} = useForm()

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        requestWrapper(() => AuthService.registerWithCredentials(data),
            () => console.log('Successfully registered with local credentials!')
        )
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{
                padding: 2,
                minWidth: 275,
                width: {
                    xs: '100%',
                    sm: 340
                }
            }} style={{marginTop: '30vh'}}>
                <CardContent>
                    <Typography variant="h5" component="div" align={"center"} style={{marginBottom: '2vh'}}>
                        REGISTRATION
                    </Typography>
                    <Controller //name
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                value={value} onChange={onChange} type={"name"} //form properties
                                label={'Nickname'}
                                placeholder={'Enter your nickname'}
                                variant="standard"
                                size={"small"}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                style={{marginBottom: '1vh'}}
                            />
                        )}
                        rules={{required: 'First name required'}}
                    />
                    <Controller //email
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                value={value} onChange={onChange} type={"email"} //form properties
                                label={'Email'}
                                placeholder={'Enter email'}
                                variant="standard"
                                size={"small"}
                                error={!!error}
                                helperText={error ? error.message : null}
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
                    }
                }}>
                    <Button
                        type={"submit"}
                        size={"medium"}
                        variant={"outlined"}
                        color={"success"}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: '100%'
                            }
                        }}
                    >SIGN UP</Button>
                    <Typography>or <Link to={Routes.LOGIN}>Log In</Link></Typography>
                </CardActions>
            </Card>
        </form>
    );
};

export default RegisterForm;
