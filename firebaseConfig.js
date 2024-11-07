// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, collection} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmsCQ1gRV1zGW_z64aAh5pcEQbdZp0Ylg",
  authDomain: "fir-chat-aa369.firebaseapp.com",
  projectId: "fir-chat-aa369",
  storageBucket: "fir-chat-aa369.firebasestorage.app",
  messagingSenderId: "66330518676",
  appId: "1:66330518676:web:5ab79b039f91a7e1538081",
  measurementId: "G-V66N44S1GW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(
  app, {
    persistence: getReactNativePersistence(AsyncStorage)
  }
)

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms')