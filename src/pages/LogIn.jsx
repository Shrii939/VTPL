import React, { useEffect, useState } from 'react'
import LoginComponent from '../components/LoginComponent'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../components/common/Loader/Loader';
import { auth } from '../firebaseConfig';

function login() {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() =>{
    onAuthStateChanged(auth, (res)=>{
      if(res?.accessToken){
        navigate("/home");
      }else{
        setLoading(false);
      }
    });
  }, []);


  return (
    loading ? <Loader/> : <LoginComponent/>
  );
}

export default login