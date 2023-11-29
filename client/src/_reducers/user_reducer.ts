import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState {
  email: string;
  password: string;
  name?: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
  name: "",
};

export const user_reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginState>) => {
      axios.post("/api/api/users/login", {
        email: action.payload.email,
        password: action.payload.password,
      })
      .then((res) => {
        if( res.data.loginSuccess ) {
          window.location.replace("/");
        } else {
          alert("Failed to login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    },
    registerUser: (state, action: PayloadAction<LoginState>) => {
      axios.post("/api/api/users/register", {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
      })
      .then((res) => {
        if( res.data.success ) {
          window.location.replace("/login");
        } else {
          alert("Failed to sign up");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    },
    authUser: (state) => {
      axios.get("/api/api/users/auth")
    .then((res) => {
      // 로그인 안된 상태
      if( !res.data.isAuth ) {
        console.log("로그인 안된 상태");
        window.location.replace("/login");
      } else {
        // 로그인된 상태
        console.log("로그인 된 상태");
        if( !res.data.isAdmin ) {
          window.location.replace("/");
        } else {
          window.location.replace("/");
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
    }
  }
});

export const { loginUser, registerUser, authUser } = user_reducer.actions;

export default user_reducer.reducer;