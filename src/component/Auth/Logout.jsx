import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const [logout,setLogout]=useState();
    const {dispatch}=useContext(AuthContext);
    const navigate=useNavigate();

    const makeLogOut=()=>{
        dispatch({
            type:'LOGOUT'
        })
        navigate('/login');
    }

  return (

    <div>
      <button onClick={makeLogOut}>logout</button>
    </div>
  )
}

export default Logout
