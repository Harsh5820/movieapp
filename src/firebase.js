import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFHyWTzK0qnrbqM9ez6UYUcsuULYTsGsY",
  authDomain: "hmdb-41c61.firebaseapp.com",
  projectId: "hmdb-41c61",
  storageBucket: "hmdb-41c61.firebasestorage.app",
  messagingSenderId: "356128345727",
  appId: "1:356128345727:web:971494b04aacdbf061794a",
  measurementId: "G-S0X95D44H6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;