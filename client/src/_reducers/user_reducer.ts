import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState {
  email: string;
  password: string;
};

interface JoinState {
  email: string;
  password: string;
  name: string;
};

export interface UserState {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isAuth: boolean;
  role: number;
};

const initialState: UserState = {
  _id: "",
  email: "",
  name: "",
  isAdmin: false,
  isAuth: false,
  role: 0,
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
          window.location.href = "/";
        } else {
          alert("Failed to login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    },
    registerUser: (state, action: PayloadAction<JoinState>) => {
      axios.post("/api/api/users/register", {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
      })
      .then((res) => {
        if( res.data.success ) {
          window.location.href = "/login";
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
        window.location.href = "/";
      } else {
        state = res.data
        return state;
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