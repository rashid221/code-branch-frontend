import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import ShowModal from "./ShowModal";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import WalletModal from "./WalletModal";

const Homepage = ({ setLoginuser, user }) => {

  const [toggle, setToggle] = useState(false);
  const [walletWinner,setWalletWinner]=useState([]);
  const [wallet, setWallet] = useState(1000);
  const userdataname = window.localStorage.getItem("userdataname");
  const userdatanumber = window.localStorage.getItem("userdatanumber");
  const userdataid = window.localStorage.getItem("userdataid");
  const [showmodal, setShowModal] = useState(false);
  const [walletmodal,setWalletmodal]=useState(false);
  const [message, setMessage] = useState('');
  const [insufficient,setSufficient]=useState('');
  const [winNum, setWinnum] = useState([]);
  const [signal,setSignal]=useState(false);
 
  

  const [walletdata, setWalletdata] = useState({
    amounts: "",
    selectNum: "",
    userId: userdataid,
    name: userdataname,
    contact: userdatanumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWalletdata({
      ...walletdata,
      [name]: value,
    });
  };

  const handleBet = (e) => {
    e.preventDefault();
    const { amounts, selectNum } = walletdata;
    if (wallet > 0 && Math.sign(wallet - amounts) !== -1) {
      if (amounts>0 && selectNum) {
        setWallet((wallet - amounts));
        axios
          .post("http://localhost:9002/useractive", walletdata)
          .then((res) => {
            setMessage(res.data.message);
          });
      } else {
        setMessage("Invalid input");
      }

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      setWalletdata({
        amounts: "",
        selectNum: "",
        userId: userdataid,
        name: userdataname,
        contact: userdatanumber,
      });
    } else {
      setWalletmodal(true);
      setTimeout(()=>{
        setWalletmodal(false);
      },1000);
      
      setSufficient("Insufficient balance");
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(()=>{
    axios
    .get("http://localhost:9002/dateannouncecalled", )
    .then((res) => {
      const times = (res.data.dateuser.map((item)=>item.dated.toString()));
      var d = new Date(times);
      console.log(d);
      let setday = d.getDate();
    let setmonth = d.getMonth()+1;
    let setyear = d.getFullYear();
    let sethours = d.getHours();
    let setmin = d.getMinutes();
  
  let showdata = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();

   let displayDate = `${setday}-${setmonth}-${setyear}-${sethours}`;
    let currentDatetime = `${day}-${month}-${year}-${hours}`;
    console.log(currentDatetime);
    console.log(displayDate);
     if (currentDatetime == displayDate) {
      setSignal(true);
      axios.get("http://localhost:9002/occurnum").then((res) => {
        setWinnum(res.data.winner);
      });
    }
  };

  showdata();
    });

    axios.get("http://localhost:9002/occurnum").then((res) => {
      const gotdata = res.data.winner.allwinner;
     let id = gotdata.map((id)=>id.userId);
     let mainid =id.map((item)=>item);
     console.log(mainid)
      if(mainid==userdataid){
        console.log(res.data.winner.WinningAmount*100);
      }
      else{
        console.log("main id did not match");
      }
    });
  
  },[])
  
  return (
    <div className="homepage">
      <div className="main">
        <div className="main-left">
         {signal?<div> <h1 style={{color:'#ADFF2F'}}>Today's Winner Number {winNum.selected}</h1><hr></hr></div> :null}
         
          <p>USERNAME : {userdataname}</p>
          <p>MOBILE NUMBER : {userdatanumber}</p>
        </div>
        <div className="main-right">
          <div className="wallet-balance">
            <Tooltip
              title="Click here for adding balance"
              TransitionComponent={Zoom}
              arrow
            >
              {" "}
              <div className="buttoned" onClick={handleToggle}>
                Wallet Balance{" "}
                <AccountBalanceWalletOutlinedIcon fontSize="small" /> : ₹{" "}
                {wallet}
              </div>
            </Tooltip>
            {toggle ? (
              <div
                onMouseLeave={handleToggle}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "2px",
                  alignItems: "center",
                  boxSizing: "border-box",
                  boxShadow: "0px 1px 2px black",
                  width: "16rem",
                  height: "100px",
                  color: "black",
                  padding: "5px",
                  position: "absolute",
                  zIndex: "999",
                  backgroundColor: "white",
                  top: "40px",
                }}
              >
                <ul>
                  <li>Total available Bal:{wallet}</li>
                  <li>
                    <div className="button-wallet">Add Amount</div>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          <div
            className="button"
            onClick={() => {
              setLoginuser({});
              window.localStorage.clear();
            }}
          >
            Logout <ExitToAppOutlinedIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="selection-field">
        <p className="icon-align">
          Note <NoteAltOutlinedIcon fontSize="small" />: Choose the number and
          bet.
        </p>
        <hr></hr>
        <br></br>
        {showmodal && <ShowModal message={message} />}
        {walletmodal && <WalletModal msg={insufficient}/>}
        <form onSubmit={handleBet}>
          <table>
            <thead>
              <th>S.No</th>
              <th>Betting Amount</th>
              <th>Select Number</th>
              <th>Select here</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Tooltip
                    title="Enter the bet amount"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    {" "}
                    <input
                      type="text"
                      name="amounts"
                      value={walletdata.amounts}
                      placeholder="₹ 200"
                      onChange={handleChange}
                    />{" "}
                  </Tooltip>
                </td>

                <td>
                  <Tooltip
                    title="Click here for selecting the number"
                    TransitionComponent={Zoom}
                    arrow
                  >
                  
                    <select
                      style={{ width: "100%" }}
                      name="selectNum"
                      onChange={handleChange}
                    >
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
                      <option>32</option>
                      <option>33</option>
                      <option>34</option>
                      <option>35</option>
                      <option>36</option>
                      <option>37</option>
                      <option>38</option>
                      <option>39</option>
                      <option>40</option>
                      <option>41</option>
                      <option>42</option>
                      <option>43</option>
                      <option>44</option>
                      <option>45</option>
                      <option>46</option>
                      <option>47</option>
                      <option>48</option>
                      <option>49</option>
                      <option>50</option>
                      <option>51</option>
                      <option>52</option>
                      <option>53</option>
                      <option>54</option>
                      <option>55</option>
                      <option>56</option>
                      <option>57</option>
                      <option>58</option>
                      <option>59</option>
                      <option>60</option>
                      <option>61</option>
                      <option>62</option>
                      <option>63</option>
                      <option>64</option>
                      <option>65</option>
                      <option>66</option>
                      <option>67</option>
                      <option>68</option>
                      <option>69</option>
                      <option>70</option>
                      <option>71</option>
                      <option>72</option>
                      <option>73</option>
                      <option>74</option>
                      <option>75</option>
                      <option>76</option>
                      <option>77</option>
                      <option>78</option>
                      <option>79</option>
                      <option>80</option>
                      <option>81</option>
                      <option>82</option>
                      <option>83</option>
                      <option>84</option>
                      <option>85</option>
                      <option>86</option>
                      <option>87</option>
                      <option>88</option>
                      <option>89</option>
                      <option>90</option>
                      <option>91</option>
                      <option>92</option>
                      <option>93</option>
                      <option>94</option>
                      <option>95</option>
                      <option>96</option>
                      <option>97</option>
                      <option>98</option>
                      <option>99</option>
                      <option>100</option>
                    </select>
                  </Tooltip>
                </td>
                <td>
                  <Tooltip title="Click" TransitionComponent={Zoom} arrow>
                    <button type="submit" className="buttons">
                      Bet
                    </button>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
