import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import "../css/Auth.css";

const AuthForm = () => {
  const { register, errors } = useForm();

  const { signin, errorMessage, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="login-page--form" onSubmit={signin({ email, password })}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          ref={register({ required: true })}
        ></input>
        {errors.email?.type === "required" && (
          <p style={{ color: "red", margin: "1px" }}>
            Please enter an email address
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          ref={register({ required: true })}
        ></input>
        {errors.password?.type === "required" && (
          <p style={{ color: "red", margin: "1px" }}>Please enter a password</p>
        )}
      </div>
      <button type="submit">{"Login"}</button>
      {errorMessage ? (
        <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
      ) : (
        clearErrorMessage
      )}
    </form>
  );
};

export default AuthForm;
