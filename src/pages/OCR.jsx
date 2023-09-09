import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader/Loader';
import { auth } from '../firebaseConfig';
import OCRComponent from '../components/OCRComponent';

function OCR() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
   
    useEffect(() => {
        onAuthStateChanged(auth, (user => {
            if(!user?.accessToken){
                navigate("/")
            }else{
                setLoading(false);
            }
        }) )
    }, [])


  return (
    loading ? <Loader/> : <OCRComponent/>
  )
}

export default OCR