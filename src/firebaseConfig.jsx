// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCusgND_AfqXevrZ0FO6xWNZsgZYlo1VkA",
  authDomain: "web1-b522b.firebaseapp.com",
  projectId: "web1-b522b",
  storageBucket: "web1-b522b.appspot.com",
  messagingSenderId: "686495810636",
  appId: "1:686495810636:web:3973fc5207cbd24227a0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {auth, firestore, app};