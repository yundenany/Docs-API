// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1Ixe71BFu7brJ3TGBB6fGnppbEkH2ZwQ",
  authDomain: "docs-af08b.firebaseapp.com",
  projectId: "docs-af08b",
  storageBucket: "docs-af08b.appspot.com",
  messagingSenderId: "765306245156",
  appId: "1:765306245156:web:d992c94663428339e408b1",
  measurementId: "G-8XX06C8DG6",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
