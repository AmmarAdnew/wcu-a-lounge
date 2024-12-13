// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "aplus-lounge-service.firebaseapp.com",
  projectId: "aplus-lounge-service",
  storageBucket: "aplus-lounge-service.firebasestorage.app",
  messagingSenderId: "186005173612",
  appId: "1:186005173612:web:ade69fad086095b326ef49",
  measurementId: "G-F4PBGXH3HB"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);