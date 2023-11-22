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
    <h1>렌딩페이지</h1>
  )
};

export default LandingPage;