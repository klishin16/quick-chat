import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import React from "react";

export const withConfirmation = (WrappedButton: React.ComponentType<any | string>, confirmationText: string, onConfirm: () => void) => {
    return class Component extends React.Component {
        state = {
            open: false
        };

        handleClickOpen = () => {
            console.log('here!')
            this.setState({open: true});
        }

        handleClose = () => this.setState({open: false});

        handleConfirm = () => {
            this.handleClose()
            onConfirm()
        }

        render() {
            return (
                <>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {confirmationText}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleConfirm} autoFocus color={"error"}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <WrappedButton onClick={this.handleClickOpen}/>
                </>
            )
        }
    }
}
