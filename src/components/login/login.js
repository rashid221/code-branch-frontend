import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginuser }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      setLoginuser(res.data.user);
      if(res.data.token && res.data.user.UserType && res.data.user.number && res.data.user._id && res.data.user.name){
      window.localStorage.setItem("token",res.data.token);
      window.localStorage.setItem("isLoggin",true);
      window.localStorage.setItem("UserType",res.data.user.UserType);
      window.localStorage.setItem("userdatanumber",res.data.user.number);
      window.localStorage.setItem("userdataid",res.data.user._id);
      window.localStorage.setItem("userdataname",res.data.user.name);
      history.push("/");
      }
      else{
        
      }
    });
  
  };

  return (
    <div className="login">
      <h2 style={{textAlign:'center'}}>Login</h2>
      <h5 style={{textAlign:'center',color:'#716368'}}>Welcome to login</h5>
      <br></br>
      <hr></hr>
      <br></br>
      <label>Mobile Number</label>
      <input
        type="text"
        name="number"
        value={user.number}
        onChange={handleChange}
      />
       <label>Password</label>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <div className="button" onClick={login}>
        Login
      </div>
      <div style={{textAlign:'center'}}>or</div>
      <h5 style={{textAlign:'center'}}>Not a User ? Register </h5>
      <div className="button" onClick={() => history.push("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
