import { React, useState }  from "react";
import GoogleButton from "react-google-button";
import "../scss/LoginComponent.scss";
import { useNavigate } from "react-router-dom";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { toast } from "react-toastify";

function LoginComponent() {
  let navigate = useNavigate();


  const [credentails, setCredentials] = useState({});

  const login = async () => {
    try{
      const res = await LoginAPI(credentails.email, credentails.password);
      localStorage.setItem('userEmail', credentails.email);
      toast.success('Logged in successfully');
      navigate('/home');
      console.log(res);
    }catch(error){
      toast.error('Invalid credentials');
    }
  }

  const googlesignIn = async () => {
    try{
      const response = await GoogleSignInAPI();
      toast.success('Logged in with Google successfully');
      navigate('/home');
      console.log(response);
    }catch(e){
      toast.error('Error logging in with Google');
    }
  }

  return (
    <div>
      <div className="card">
        <div className="login">
          <input 
           onChange={(event) => {
            setCredentials({...credentails, email:event.target.value});
           }}
          type="email" placeholder="Email ID" />
          <input 
           onChange={(event => {
            setCredentials({...credentails, password: event.target.value})
           })}
          type="password" placeholder="password" />
          <input type="button" value="Login" onClick={login} />
        </div>
        <div className="logInWithGoogle">
            <GoogleButton className="googleButton"  onClick={ googlesignIn }/>
        </div>
        <p className="signup">Don't have an account? <span onClick={() => navigate("/SignUp")}>SignUp</span> </p>
      </div>
    </div>
  );
}

export default LoginComponent;
