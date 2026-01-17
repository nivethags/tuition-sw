import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../../style/Form.css';

const Register = () => {

    const navigate=useNavigate();

    const [user,setUser]=useState({name:'',password:''});

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setUser(prev=>({...prev,[name]:value}))
    }

    const handleSubmit=()=>{
        // console.log("forn submitted");
        // console.log(user);
        
        axios.post('http://localhost:5000/signup',{username:user.name,password:user.password})
        .then(res=>{ console.log(res)
            if(res.data.status){
                navigate('/');
            }
        })
        .catch(err=>console.log(err)
        )
    }

  return (
    <div className="form-container">
      <form className="registration-form" method="post">
        <div className="input-group">
          <label htmlFor="userName">Enter Your User Name</label>
          <input type="text" name="name" id="userName" autoComplete="username" onChange={handleInput} />
        </div>
        <div className="input-group">
          <label htmlFor="Password">Enter Your Password</label>
          <input type="password" name="password" id="Password" autoComplete="new-password" onChange={handleInput} />
        </div>
        <div className="input-group">
          <label htmlFor="ConfPassword">Confirm Your Password</label>
          <input type="password" name="ConfPassword" id="ConfPassword" autoComplete="new-password" />
        </div>
        <div className="button-container">
          <button type="button" onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </div>)
}

export default Register