// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ0UXdxmh6M_qMf0rdtXVRIIkbpjfBp34",
  authDomain: "todoapplication-863f7.firebaseapp.com",
  projectId: "todoapplication-863f7",
  storageBucket: "todoapplication-863f7.appspot.com",
  messagingSenderId: "648284038875",
  appId: "1:648284038875:web:82d9e50e5b21fd20ea0efe",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const db = getFirestore(app);
export { auth, provider };
