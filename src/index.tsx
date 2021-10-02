import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat";



const firebaseConfig = {
    apiKey: "AIzaSyDMkiWcgn2RHGINdze6WhAzgZIFtX18A7U",
    authDomain: "quick-chat-8d3bf.firebaseapp.com",
    projectId: "quick-chat-8d3bf",
    storageBucket: "quick-chat-8d3bf.appspot.com",
    messagingSenderId: "153531162448",
    appId: "1:153531162448:web:33e29f331e8c926fea5655"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const firestore = firebase.firestore()

// interface IFirebaseContextProps {
//     firebase?: any;
//     auth?: any;
//     firestore?: any
// }

export const FirebaseContext = React.createContext<any | null>(null)




ReactDOM.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={{
            firebase,
            auth,
            firestore
        }}>
            <App/>
        </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
