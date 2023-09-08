import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../components/common/Loader/Loader';
import { auth } from '../firebaseConfig';

function Home() {
  
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth , (res) => {
      if(!res?.accessToken){
        navigate("/");
      }else{
        setLoading(false);
      }
    });
    
  }, []);

  return loading ? <Loader/> : <HomeComponent/>;

}

export default Home