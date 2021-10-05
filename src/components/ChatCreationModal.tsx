import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";


interface IChatCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const ChatCreationModal:React.FC<IChatCreationModalProps> = ({isOpen, onClose}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>CREATE CHAT</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create new chat dialog. You can invite other users by invite link.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Chat email"
                    type="name"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {}}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatCreationModal;
