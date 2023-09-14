import React from "react";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <>
      <div className="home-page">
        <div className="home-main">
          <div className="home-left">
            <h2>
              <span className="span-socials">
                <HomeSharpIcon
                  style={{
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </span>{" "}
              Home
            </h2>
            <h1>
              Play on Any <br /> Device, anytime,
              <br /> anywhere!{" "}
            </h1>
            <h3 style={{ margin: "1rem",color:'#EC9F21' }}>India's Best Online Casino</h3>
            <Button
              className="home-buttons"
              onClick={() => history.push("/login")}
              style={{
                backgroundColor: "#E80054",
                color: "white",
                cursor:'pointer',
                width: "15rem",
                fontWeight: "bold",
                marginBottom: "7rem",
                borderRadius: "0.2rem",
                padding: "0.7rem 0.7rem",
                border: "0rem",
                fontSize: "1.3rem",
              }}
            >
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
