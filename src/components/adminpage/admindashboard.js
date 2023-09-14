import React, { useEffect, useState } from "react";
import "./admindashboard.css";
import axios from "axios";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import CampaignIcon from '@mui/icons-material/Campaign';

const Admindashboard = ({ setLoginuser, user }) => {
  const [totalbet, setTotalbet] = useState("");
  const [data, setData] = useState([]);
  const [numberlist, setNumber] = useState([]);
  const [winNum, setWinnum] = useState([]);
  const [dates, setDate] = useState({
    dated:"",
  });

  useEffect(() => {
    axios.get("http://localhost:9002/userlist").then((res) => {
      setData(res.data.user);
    });
    axios.get("http://localhost:9002/numberlist").then((res) => {
      setNumber(res.data.activeuser);
    });
    axios.get("http://localhost:9002/totalamount").then((res) => {
      setTotalbet(res.data.active[0].salary_sum);
    });
    axios.get("http://localhost:9002/occurnum").then((res) => {
      setWinnum(res.data.winner);
      console.log(res.data.winner.allwinner)
    });
  }, []);


  const handleDate = (e) => {
    setDate({dated:e.target.value});
  };

  const addDate=()=>{
    const { dated } = dates;
    if(dated){
    axios.post("http://localhost:9002/dateannounce", dates).then((res) => {
        alert(res.data.message);
        setDate({dated:""});
      })
    }
    else{
      alert("Please enter the announcement date");
    }
    }

  

  return (
    <div className="adminpage">
      <div className="main">
        <div className="main-left">
          <p className="admin-center">
            Admin Dashboard <DashboardCustomizeIcon fontSize="small" />
          </p>
          <hr></hr>
        </div>
        <div className="main-right">
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
      <p>Winner Number {winNum.selected}</p>
      <p>Winning Amount {winNum.WinningAmount * 100}</p>
      <p>Total Betting Amount : ₹ {totalbet}</p>
      <br></br>
      <br></br>

      <div className="form-fields">
        <label
          htmlFor="birthdaytime"
          style={{ fontSize: "1.4rem", color: "black" }}
        >
          Announcement of the winners{" "}
        </label>
        <input
          type="datetime-local"
          onChange={handleDate}
          value={dates.dated}
          name="dated"
        />
        <button className="buttoneds" onClick={addDate}>
          Click here for Announcement <CampaignIcon fontSize="medium"/>
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <th>S.No</th>
          <th>Date</th>
          <th>Name of the Users</th>
          <th>Mobile Number</th>
          <th>User Type</th>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <>
                <tr>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                  <td>
                    <span className="admin-user">
                      {item.UserType}{" "}
                      {item.UserType === "Admin" ? (
                        <AdminPanelSettingsOutlinedIcon fontSize="small" />
                      ) : null}
                    </span>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <table>
        <thead>
          <th>S.No.</th>
          <th>Date</th>
          <th>Time</th>
          <th>Number Selected</th>
          <th>Amount</th>
          <th>Contact</th>
        </thead>

        <tbody>
          {numberlist.map((item) => {
            return (
              <>
                <tr>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                  <td>{item.selectNum}</td>
                  <td>₹ {item.amounts}</td>
                  <td>{item.contact}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admindashboard;
