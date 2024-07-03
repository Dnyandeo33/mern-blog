// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-dffb7.firebaseapp.com",
    projectId: "mern-blog-dffb7",
    storageBucket: "mern-blog-dffb7.appspot.com",
    messagingSenderId: "135684748984",
    appId: "1:135684748984:web:a22bf6e65ba764609f664d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);