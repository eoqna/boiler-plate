import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../../_reducers/hooks";
import { registerUser } from "../../../_reducers/user_reducer";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const onChangeConfirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if( password !== confirmPassword ) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    };

    const body = {
      email,
      password,
      name,
    };

    const result = dispatch(registerUser(body));

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
        <label>Name</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => {onChangeNameHandler(e)}}
        />
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => {onChangePasswordHandler(e)}}
        />
        <label>Confirm Password</label>
        <input 
          type="password"
          value={confirmPassword}
          onChange={(e) => {onChangeConfirmPasswordHandler(e)}}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default RegisterPage;