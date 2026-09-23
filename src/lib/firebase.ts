import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaj9_sZ8xmmk2VhJSukHWVfdo07iBMmZE",
  authDomain: "pixel-publication.firebaseapp.com",
  projectId: "pixel-publication",
  storageBucket: "pixel-publication.firebasestorage.app",
  messagingSenderId: "996540070866",
  appId: "1:996540070866:web:fa529840dbb8173ae3260b",
  measurementId: "G-H2QCNMKYR8"
};

// Initialize Firebase securely (prevents re-initialization error in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
