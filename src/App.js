import { useState } from "react";
import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Admindashboard from "./components/adminpage/admindashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./Footer";
import Home from "./Home";

function App() {
  const [user, setLoginuser] = useState({});
  const isLoggin = window.localStorage.getItem("isLoggin");
  const isUsertype = window.localStorage.getItem("UserType");
  return (<>
  
    <div className="App">
  <Router>
      <Navbar/>
        <Switch>
          <Route exact path="/">
             {isUsertype === "Admin" && isLoggin==='true' ? (
              <Admindashboard user={user} setLoginuser={setLoginuser} />
            ) :isUsertype === "User" && isLoggin==='true' ? (
              <Homepage user={user} setLoginuser={setLoginuser} />
            ) : (
            <Home/>
            )}
          </Route>
          <Route path="/login">
            <Login setLoginuser={setLoginuser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
    <Footer/>
    </>  );
}

export default App;
