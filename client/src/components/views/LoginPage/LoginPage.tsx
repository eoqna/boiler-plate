import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../_reducers/hooks";
import { loginUser } from "../../../_reducers/user_reducer";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));
  };
  
  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }}>
      <h2>Login</h2>
      <form 
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <input 
          style={{
            width: 300,
            padding: "8px 12px",
            marginBottom: 30,
            border: "1px solid #bbb",
            borderRadius: 5,
            outline: "none",
          }}
          type="email"
          value={email}
          autoFocus={true}
          onChange={(e) => {onChangeEmailHandler(e)}}
        />
        <input 
          style={{
            width: 300,
            padding: "8px 12px",
            marginBottom: 30,
            border: "1px solid #bbb",
            borderRadius: 5,
            outline: "none",
          }}
          type="password"
          value={password}
          onChange={(e) => {onChangePasswordHandler(e)}}
        />
        <br />
        <button
          style={{
            height: 30,
            background: "blue",
            color: "#fff",
            border: 0,
            borderRadius: 5,
          }}
        >
          Log in
        </button>
        <p
          style={{
            fontSize: 14
          }}
        >
          <span>Or</span>
          <a 
            href="/register"
            style={{
              color: "blue",
              textDecoration: "none",
            }}
          > register new!</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;