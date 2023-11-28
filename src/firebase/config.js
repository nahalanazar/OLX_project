import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu2u5QR5beVqgBeBaBWQxC1pClutsWt_E",
  authDomain: "olx-project-237af.firebaseapp.com",
  projectId: "olx-project-237af",
  storageBucket: "olx-project-237af.appspot.com",
  messagingSenderId: "213457741572",
  appId: "1:213457741572:web:d07541949c995712fe9251",
  measurementId: "G-XW90Q6Z8H0"
};

export const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app)
// export default db;
