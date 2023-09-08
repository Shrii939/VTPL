import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";


export const LoginAPI = async (email, password) => {
  try {
    let login_ressonse =  signInWithEmailAndPassword(auth, email, password);
    return login_ressonse;
  } catch (error) {
    console.log("Error occured while login:", error);
    return error;
  }
};

export const GoogleSignInAPI = async () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  } catch (err) {
   console.log(err);
   return err;
  }
}

export const RegisterAPI = (email, password) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const LogoutAPI = async () => {
  console.log('Logging out...');
  try{
    signOut(auth);
  } catch (err){
    return err;
  }
}