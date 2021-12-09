import firebase from 'firebase/compat/app';
import { } from 'firebase/analytics'

import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDQQakb0mFlbXGmJUyrYyh7h3CqQa238iw",
    authDomain: "chat-app-1dbeb.firebaseapp.com",
    projectId: "chat-app-1dbeb",
    storageBucket: "chat-app-1dbeb.appspot.com",
    messagingSenderId: "481788994546",
    appId: "1:481788994546:web:b2a27f896fc91d9853816b",
    measurementId: "G-NV84EHYS65"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const auth = getAuth();
const db = getFirestore();

// auth.useEmulators('https://localhost:9099');
connectAuthEmulator(auth, 'http://localhost:9099')
// if (window.location.hostname === 'localhost') {
connectFirestoreEmulator(db, 'localhost', 8080)
// }



export { auth, db };
export default firebase;