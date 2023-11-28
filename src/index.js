import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { FirebaseContext } from './store/Context'; 
import { firestore } from './firebase/config'
// import db from './firebase/config'
ReactDOM.render(
    <FirebaseContext.Provider value={{ firestore }}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
