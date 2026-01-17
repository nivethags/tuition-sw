import React, { useContext, useEffect,useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const Profile = () => {

    const {user,dispatch}=useContext(AuthContext);
    const[userName,setUserName]=useState();

    
    const getProfile=()=>{
        
        axios.defaults.headers.common["Authorization"]=user;

        axios.get('http://localhost:5000/profile')
        .then(res=>{
            setUserName(res.data.name);
            console.log(res.data); 
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getProfile();
    },[])


  return (
    <div>
      <h1>welcome {userName && userName}</h1>
    </div>
  )
}

export default Profile
