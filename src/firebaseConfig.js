import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlsrPYk2QE6H2EApw9z8dkgB1IlmWJTIo",
  authDomain: "habit-tracker-7b6d8.firebaseapp.com",
  projectId: "habit-tracker-7b6d8",
  storageBucket: "habit-tracker-7b6d8.appspot.com",
  messagingSenderId: "1074894424904",
  appId: "1:1074894424904:web:93ce01a2159ed6f408417d",
  measurementId: "G-8BK3GF9F80",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
