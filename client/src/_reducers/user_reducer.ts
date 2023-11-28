import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState {
  email: string;
  password: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
};

export const user_reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginState>) => {
      const req = axios.post("/api/api/users/login", {
        email: action.payload.email,
        password: action.payload.password,
      })
      .then((res) => {
        if( res.data.loginSuccess ) {
          
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    },
  }
});

export const { loginUser } = user_reducer.actions;

export default user_reducer.reducer;