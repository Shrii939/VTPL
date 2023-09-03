import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterAPI, LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";

function SignUpComponent() {
  let [credentails, setCredentials] = useState({});
  let navigate = useNavigate();

  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account created");
      localStorage.setItem("userEmail", credentails.email);
      localStorage.setItem("userName", credentails.username);

      console.log("userEmail", res.user.email);
      console.log(res);
      navigate("/home");
    } catch (error) {
      toast.error("coudn't register you'r account");
    }
  };

  const googleSignIn = async () => {
    try {
      const response = await GoogleSignInAPI();
      toast.success("Account created using Google");
      navigate("/home");
    } catch (error) {
      toast.error("Error occured while signing in with Google");
    }
  };

  return (
    <div>
      <div className="card">
        <span className="headding">Sign up</span>
        <div className="login">
          <input
            onChange={(event) => {
              setCredentials({ ...credentails, username: event.target.value });
            }}
            type="text"
            placeholder="Enter Username"
          />
          <input
            onChange={(event) => {
              setCredentials({ ...credentails, email: event.target.value });
            }}
            type="email"
            placeholder="Enter Email ID"
          />
          <input
            onChange={(event) => {
              setCredentials({ ...credentails, password: event.target.value });
            }}
            type="password"
            placeholder="Enter password"
          />
          <input type="button" value="Login" onClick={register} />
        </div>
        <div className="logInWithGoogle">
          <GoogleButton
            label="Sign up with Google"
            className="googleButton"
            onClick={googleSignIn}
          />
        </div>
        <p className="signup">
          already have an account?{" "}
          <span onClick={() => navigate("/")}>SignIn</span>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignUpComponent;
