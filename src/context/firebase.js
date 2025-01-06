// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd1NZNJheKzIw1ykuwfj5qLQF12uhrzRE",
  authDomain: "twitter-965bc.firebaseapp.com",
  projectId: "twitter-965bc",
  storageBucket: "twitter-965bc.firebasestorage.app",
  messagingSenderId: "720966605718",
  appId: "1:720966605718:web:a35e9587589d4528aadbb7",
  measurementId: "G-WGP8N6GDPX"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const analytics = getAnalytics(app);

export { auth, analytics };
