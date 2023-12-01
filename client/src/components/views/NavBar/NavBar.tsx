import React, { useEffect } from "react";
import { useAppSelector } from "../../../_reducers/hooks";
import axios from "axios";

const NavBar = () => {
  const selector = useAppSelector(state => state.user);

  const onClickHome = () => {
    window.location.href = "/";
  };

  const onClickSignin = () => {
    window.location.href = "/login";
  };
  
  const onClickSignup = () => {
    window.location.href = "/register";
  };

  const onClickSignout = async () => {
    await axios.get("/api/api/users/logout")
    .then((res) => {
      console.log(res);
      document.cookie = "x_auth=;";
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        height: 50,
        width: "100%",
        border: "1px solid #ccc",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            padding: "0 60px 0 15px",
          }}
        >
          <p
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 20,
              cursor: "pointer"
            }}
            onClick={onClickHome}
          >
            Logo
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{ padding: "0 30px 0 5px", cursor: "pointer" }}
              onClick={onClickHome}
            >
              Home
            </p>
          </div>
          <div>
            <p
              style={{ padding: "0 30px 0 5px", cursor: "pointer" }}
            >
              Blogs
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
          {!selector.isAuth ?
            <>
              <div>
                <p
                  style={{ padding: "0 15px", cursor: "pointer" }}
                  onClick={onClickSignin}
                >
                  Signin
                </p>
              </div>
              <div>
                <p
                  style={{ padding: "0 15px", cursor: "pointer" }}
                  onClick={onClickSignup}
                >
                  Signup
                </p>
              </div>
            </>
              :
            <div>
              <p
                  style={{ padding: "0 15px", cursor: "pointer" }}
                  onClick={onClickSignin}
                >
                  Signout
                </p>
            </div>
          }
      </div>
    </div>
  )
};

export default NavBar;