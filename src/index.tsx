import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat";

const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_DATABASE_URL,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    // databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    // measurementId: REACT_APP_MEASUREMENT_ID
};
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('firebase config', firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
