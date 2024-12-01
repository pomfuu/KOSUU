import { initializeApp } from 'firebase/app'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase authentication
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDF3187eOCbR99ZJFvRi4w92GFiFA0Gcbs",
  authDomain: "teskosudulu.firebaseapp.com",
  projectId: "teskosudulu",
  storageBucket: "teskosudulu.appspot.com",
  messagingSenderId: "328107246588",
  appId: "1:328107246588:web:4fadb134d7d752de60e879"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Authentication service

// Export services for use in your app
export { auth };