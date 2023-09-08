import React from 'react'
import { LogoutAPI } from '../api/AuthAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LogoutComponent() {
    const navigate = useNavigate;

    const logout=  async () => {
        console.log("Logging out");
            let response = await LogoutAPI();
            toast.success("Successfully logout from your account");
            navigate("/");
    };
    

  return (
    <div>
        <button  onClick={logout} >Logout</button>

    </div>
  )
}

export default LogoutComponent