import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-rq.firebaseapp.com",
  projectId: "chat-rq",
  storageBucket: "chat-rq.firebasestorage.app",
  messagingSenderId: "423016575742",
  appId: "1:423016575742:web:478a2408638a824b81ebaf",
  measurementId: "G-WZYHNES7QS",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
