// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6JRLBGJuZSyh0y3xN9x2i1gqQCO7sV0g",
  authDomain: "hyrup-84839.firebaseapp.com",
  projectId: "hyrup-84839",
  storageBucket: "hyrup-84839.firebasestorage.app",
  messagingSenderId: "730899264601",
  appId: "1:730899264601:web:a13e6dfc0aeb067f876d48",
  measurementId: "G-6JCEYDVFJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider();

export { auth , googleProvider };