import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "truad-11107.firebaseapp.com",
  projectId: "truad-11107",
  storageBucket: "truad-11107.appspot.com",
  messagingSenderId: "413895231783",
  appId: "1:413895231783:web:b32e95c0fdeca6b6bcc102",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
