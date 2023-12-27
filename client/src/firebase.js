// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-f2cd8.firebaseapp.com",
  projectId: "real-estate-f2cd8",
  storageBucket: "real-estate-f2cd8.appspot.com",
  messagingSenderId: "384420137163",
  appId: "1:384420137163:web:ca1a604d607657faabf34e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);