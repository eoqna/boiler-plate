import axios from "axios";
import { useEffect } from "react";
import { useAppSelector } from "../../../_reducers/hooks";
import { UserState } from "../../../_reducers/user_reducer";

const LandingPage = () => {
  const seletor: UserState = useAppSelector(state => state.user);

  useEffect(() => {
    console.log(seletor);
    
    axios.get("/api/api/hello")
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }}>
      <h2>Let's Start Coding!</h2>
    </div>
  )
};

export default LandingPage;