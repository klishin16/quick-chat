import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ChatService} from "../../services/ChatService";
import {useRequest} from "../../hooks/useRequest";
import {AuthContext} from "../../contexts/AuthContext";
import firebase from "firebase/compat";


interface IChatCreationFormInputs {
    title: string;
    description: string;
}

interface IChatCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatCreationModalForm: React.FC<IChatCreationModalProps> = ({isOpen, onClose}) => {
    const {requestError, loading, requestWrapper} = useRequest()
    const {handleSubmit, control} = useForm()
    const {user} = useContext(AuthContext)

    const onSubmit: SubmitHandler<IChatCreationFormInputs> = (formData) => {
        console.log(formData)
        requestWrapper(
            () => ChatService.create({
                ...formData,
                ownerUid: user?.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }),
            () => {
                onClose()
                console.log('Successfully created chat!')
            }
        )
    }


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>CREATE CHAT</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        Create new chat dialog. You can invite other users by invite link.
                    </DialogContentText>

                    <Controller //title
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                value={value} onChange={onChange} type={"text"} //form properties
                                label={'Chat title'}
                                variant="standard"
                                error={!!error || !!requestError} //TODO
                                helperText={error ? error.message : requestError} // TODO
                                fullWidth
                                margin="normal"
                            />
                        )}
                        rules={{required: 'Chat title required'}}
                    />

                    <Controller //description
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                value={value} onChange={onChange} type={"text"} //form properties
                                label={'Chat description'}
                                variant="standard"
                                error={!!error || !!requestError} //TODO
                                helperText={error ? error.message : requestError} // TODO
                                fullWidth
                                margin="normal"
                            />
                        )}
                        rules={{required: 'Chat description required'}}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type={"submit"}>Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ChatCreationModalForm;
