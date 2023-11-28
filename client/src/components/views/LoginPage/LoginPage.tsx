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

    const result = dispatch(loginUser(body));

    if( result ) {
      console.log(result);
    }
  };
  
  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }}>
      <form 
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <label>Email</label>
        <input 
          type="email"
          value={email}
          autoFocus={true}
          onChange={(e) => {onChangeEmailHandler(e)}}
        />
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => {onChangePasswordHandler(e)}}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;