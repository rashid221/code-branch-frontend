import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    UserType: "",
    name: "",
    number: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { UserType, name, number, password, reEnterPassword } = user;
 
    if (user.UserType == "Admin" && user.secret != "sahil") {
      alert("Invalid Admin");
    } else if (
      UserType &&
      name &&
      number.length===10 &&
      password.length===5 &&
      password === reEnterPassword
    ) {
      axios.post("http://localhost:9002/register", user).then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("invalid input");
    }
  };

  return (
    <div className="register">
      <h2 style={{textAlign:'center'}}>Register</h2>
      <h5 style={{textAlign:'center',color:'#716368'}}>To keep connected with us please signup</h5>
      <br></br>
      <hr></hr>
      <br></br>
      <div style={{color:'white',textAlign:'center'}}>
        Register as
        <input
          type="radio"
          name="UserType"
          value="User"
          onChange={handleChange}
        />
        User
        <input
          type="radio"
          name="UserType"
          value="Admin"
          onChange={handleChange}
        />
        Admin
      </div>
      <br></br>
      {user.UserType === "Admin" ? (
        <div>
          <label>Secret Key</label>
          <input 
            type="password"
            name="secret"
            onChange={handleChange}
          />
        </div>
      ) : null}
      <label>Enter your Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <label>Enter your Mobile Number</label>
      <input
        type="text"
        name="number"
        value={user.number}
        onChange={handleChange}
      />
      <label>Enter your Password</label>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <label>Enter confirm Password</label>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        onChange={handleChange}
      />
      <div className="button" onClick={register}>
        Register
      </div>
      <div style={{textAlign:'center'}}>or</div>
      <h5 style={{textAlign:'center'}}>Already a user ? Login </h5>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
