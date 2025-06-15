// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMKt4qVjj174TEFaCTH6LSpZBvMJGBVoI",
  authDomain: "mark-b2b08.firebaseapp.com",
  projectId: "mark-b2b08",
  storageBucket: "mark-b2b08.firebasestorage.app",
  messagingSenderId: "57899165594",
  appId: "1:57899165594:web:007a35d7f87bbdaa69fc23",
  measurementId: "G-P1D2TM6P5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
export default app;