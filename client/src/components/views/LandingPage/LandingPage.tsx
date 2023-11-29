import axios from "axios";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    axios.get("/api/api/hello")
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/api/users/logout")
    .then((res) => {
      if( res.data.logoutSuccess ) {
        window.location.replace("/login");
      } else {
        alert("Failed to logout")
      }
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>
        Logout
      </button>
    </div>
  )
};

export default LandingPage;