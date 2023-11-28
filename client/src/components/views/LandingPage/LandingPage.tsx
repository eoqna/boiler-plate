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
    })
  }, []);

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }}>
      <h2>시작 페이지</h2>
    </div>
  )
};

export default LandingPage;