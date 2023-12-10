import React, { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import classes from './Login.module.scss';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sendRequestSU = async ()=>{
    const res = await axios
    .post(`http://localhost:3001/api/nhanvien/login`,{
      email:String(email),
      password:String(password)
    })
    .catch((err)=>{
      alert("Đăng nhập lỗi!")
      console.log(err);})
    const data = await res.data;
    console.log(data);
    return data;
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (e) => {
    if(email === '' || password === '')
    {
        e.preventDefault();
        alert("login failed!");
    } else {
      e.preventDefault();
      sendRequestSU()
      .then((data)=>{
        localStorage.setItem("user",JSON.stringify(data.nhanvien));
        //localStorage.setItem("token",data.token);
        Cookies.set('token', data.token);
      })
      .then(()=>{const id = localStorage.getItem("userId"); console.log(id);})
      .then(()=>navigate("/"));
      }
}
  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(`email: ${email}, password: ${password}`);
  };

  return (
    <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.form}>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <button type="submit">Log In</button>
        </form>
    </div>
    
  );
}

export default Login;
