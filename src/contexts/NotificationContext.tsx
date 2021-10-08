import React, {useState} from 'react';
import {Alert, Snackbar} from "@mui/material";

export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error'
}

type Notification = {
    notificationType: NotificationType
    message: string
}

interface INotificationContext {
    notifications: Notification[]
    addNotification: (type: NotificationType, message: string) => void
}


export const NotificationContext = React.createContext<INotificationContext>({
    notifications: [],
    addNotification: () => { }
})


export const NotificationProvider: React.FC = ({children}) => {
    const notificationDuration = 700
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [notificationType, setNotificationType] = useState<NotificationType>(NotificationType.SUCCESS);
    const [notificationMessage, setNotificationMessage] = useState("");

    const notifications = React.useRef<Notification[]>([
        {
            notificationType: NotificationType.SUCCESS,
            message: 'Work!'
        },
    ])

    function addNotification(type: NotificationType, message: string) {
        notifications.current.push({notificationType: type, message})
        displayNotifications()
    }

    function displayNotifications() {
        const notification = notifications.current.pop()
        if (notification) {
            setNotificationType(notification.notificationType)
            setNotificationMessage(notification.message)
            setIsSnackBarOpen(true)
            setTimeout(() => {
                setIsSnackBarOpen(false)
                setTimeout(() => displayNotifications(), notificationDuration)
            }, notificationDuration)
        }
    }

    function handleClose() {
        setIsSnackBarOpen(false)
    }

    return (
        <NotificationContext.Provider value={{
            notifications: notifications.current,
            addNotification
        }}>
            <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={notificationType} sx={{width: '100%'}}>
                    {notificationMessage}
                </Alert>
            </Snackbar>

            {children}

        </NotificationContext.Provider>
    );
};


