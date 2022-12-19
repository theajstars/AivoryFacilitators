import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../../Assets/IMG/Logo.png";
import axios from "axios";
import { baseURL, validateEmail } from "../../App";
import { message } from "antd";
import Cookies from "js-cookie";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoggingIn, setLoggingIn] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const loginUser = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 8;
    if (!isEmailValid) {
      message.error("Please enter a valid email!");
    } else {
      if (!isPasswordValid) {
        message.error("Your password is at least 8 characters");
      }
    }
    if (isPasswordValid && isEmailValid) {
      setLoggingIn(true);
      axios
        .post(`${baseURL}/facilitator/login`, { email, password })
        .then((res) => {
          setLoggingIn(false);
          console.log(res);
          if (res.data.notFound) {
            //Mentor does not exists in DB
            message.error("Account not found!");
          } else {
            if (res.data.auth) {
              message.success("Login successful!");
              Cookies.set("ud", res.data.token);
              props.passRoute("dashboard");
            } else {
              message.error("Invalid email and password!");
            }
          }
        })
        .catch(() => {
          setLoggingIn(false);
        });
    }
  };
  return (
    <div className="auth-container login-container flex-column">
      <img src={Logo} alt="" className="auth-logo" />
      <span className="auth-header">Welcome Back</span>

      <div className="auth-input-container flex-row">
        &nbsp; &nbsp; &nbsp;
        <span className="auth-input-icon">
          <i className="fas fa-envelope"></i>
        </span>
        <input
          type="text"
          className="auth-input"
          spellCheck="false"
          placeholder="Email address"
          autoComplete="false"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="adsnfiiu89e2hy43ub8ihasd"
        />
      </div>
      <div className="auth-input-container flex-row">
        &nbsp; &nbsp; &nbsp;
        <span className="auth-input-icon">
          <i className="fas fa-lock"></i>
        </span>
        <input
          type={`${isPasswordVisible ? "text" : "password"}`}
          className="auth-input"
          spellCheck="false"
          placeholder="Password"
          autoComplete="false"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span
          className="auth-input-icon password-eye"
          onClick={togglePasswordVisible}
        >
          {isPasswordVisible ? (
            <i className="far fa-eye-slash"></i>
          ) : (
            <i className="far fa-eye"></i>
          )}
        </span>
      </div>
      <div className="flex-row auth-options">
        <div className="auth-options-item flex-row">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span
            className="form-text"
            onClick={() => {
              setRememberMe(!rememberMe);
            }}
          >
            Remember Me
          </span>
        </div>
        <div className="auth-options-item flex-row">
          <span
            className="form-text"
            style={{
              color: "#81839F",
              cursor: "pointer",
            }}
            onClick={() => {
              props.passRoute("reset");
            }}
          >
            Forgot Password?
          </span>
        </div>
      </div>
      <button className="auth-btn auth-action-btn" onClick={loginUser}>
        {isLoggingIn ? (
          <>
            Signing In &nbsp; <i className="far fa-spinner fa-spin"></i>
          </>
        ) : (
          <>Login</>
        )}
      </button>

      <center style={{ width: "100%" }}>
        <span className="form-text">
          Don't have an account?{" "}
          <b
            onClick={() => {
              props.passRoute("inputSignUpToken");
            }}
            style={{
              cursor: "pointer",
            }}
          >
            Sign Up
          </b>
        </span>
      </center>
      <center style={{ width: "100%" }}>
        <span
          className="form-text"
          style={{
            color: "#81839F",
          }}
          onClick={() => {
            window.location.href = "https://aivorytech.com/";
          }}
        >
          <i className="far fa-long-arrow-left"></i>
          &nbsp;&nbsp;&nbsp; Back to Homepage
        </span>
      </center>
    </div>
  );
}
