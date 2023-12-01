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
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }}>
      <h2>
        Signup
      </h2>
      <form 
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <label
            style={{ width: 100, textAlign: "right", marginRight: 10}}
          >
            <span style={{color: "red"}}>* </span>Email:
          </label>
          <input 
            style={{
              width: 250,
              padding: "8px 12px",
              border: "1px solid #bbb",
              borderRadius: 5,
              outline: "none",
            }}
            type="email"
            placeholder="Enter your Email"
            value={email}
            autoFocus={true}
            onChange={(e) => {onChangeEmailHandler(e)}}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <label
            style={{ width: 100, textAlign: "right", marginRight: 10}}
          >
            <span style={{color: "red"}}>* </span>Name:
          </label>
          <input 
            style={{
              width: 250,
              padding: "8px 12px",
              border: "1px solid #bbb",
              borderRadius: 5,
              outline: "none",
            }}
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => {onChangeNameHandler(e)}}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <label
            style={{ width: 100, textAlign: "right", marginRight: 10}}
          >
            <span style={{color: "red"}}>* </span>Password:
          </label>
          <input 
            style={{
              width: 250,
              padding: "8px 12px",
              border: "1px solid #bbb",
              borderRadius: 5,
              outline: "none",
            }}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {onChangePasswordHandler(e)}}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <label
            style={{ width: 100, textAlign: "right", marginRight: 10}}
          >
            <span style={{color: "red"}}>* </span>Confirm:
          </label>
          <input 
            style={{
              width: 250,
              padding: "8px 12px",
              border: "1px solid #bbb",
              borderRadius: 5,
              outline: "none",
            }}
            type="password"
            placeholder="Enter your confirmPassword"
            value={confirmPassword}
            onChange={(e) => {onChangeConfirmPasswordHandler(e)}}
          />
        </div>
        <br />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <button
            style={{
              height: 35,
              width: 80,
              background: "blue",
              color: "#fff",
              border: 0,
              borderRadius: 5,
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;