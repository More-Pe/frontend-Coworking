import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDt0Cv_AWwEazQaPcdoUbVuf2P0j_ZHCqk",
    authDomain: "navescoworking.firebaseapp.com",
    projectId: "navescoworking",
    storageBucket: "navescoworking.appspot.com",
    messagingSenderId: "722868900329",
    appId: "1:722868900329:web:1509498986ed911b583b78",
    measurementId: "G-33HFM1T7NP"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
