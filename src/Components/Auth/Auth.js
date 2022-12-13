import { useState } from "react";

import { Navigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

import Login from "./Login";
import AuthSideBox from "./AuthSideBox";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";

import Logo from "../../Assets/IMG/Logo.png";
import { baseURL } from "../../App";

export default function Auth() {
  const [componentToShow, setComponentToShow] = useState(null);

  const [signUpToken, setSignUpToken] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const passRoute = (route) => {
    setComponentToShow(route);
  };
  const togglePasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const [isVerifyingToken, setVerifyingToken] = useState(false);

  const verifySignUpToken = () => {
    if (signUpToken.length !== 10) {
      message.warning("Please enter a valid token!");
    } else {
      setVerifyingToken(true);
      axios
        .post(`${baseURL}/facilitator/verifySignUpToken`, { signUpToken })
        .then((res) => {
          setVerifyingToken(false);
          console.log(res);
          if (res.data.expired) {
            message.error("Token is expired!");
          } else {
            if (!res.data.auth) {
              message.error("Token is invalid!");
            } else {
              // Token is valid
              message.success("Valid Token!");
              setComponentToShow("signup");
            }
          }
        })
        .catch(() => {
          setVerifyingToken(false);
        });
    }
  };
  return (
    <div className="flex-row auth-body-container">
      {componentToShow === "dashboard" && <Navigate to="/dashboard" />}
      <AuthSideBox />
      <div className="auth-section">
        {componentToShow === null && (
          // If componentToShow is null then show Login/Signup Box
          <div className="auth-container mentor-auth-container flex-column">
            <img src={Logo} alt="" className="auth-logo" />
            <span className="auth-header">Facilitator's Dashboard</span>
            <button
              className="auth-btn auth-action-btn mentor-auth-signup-button"
              onClick={() => {
                setComponentToShow("inputSignUpToken");
              }}
            >
              Sign Up
            </button>
            <button
              className="auth-btn auth-action-btn"
              onClick={() => {
                setComponentToShow("login");
              }}
            >
              Login
            </button>
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
        )}
        {componentToShow === "inputSignUpToken" && (
          <div className="auth-container mentor-auth-container flex-column">
            <img src={Logo} alt="" className="auth-logo" />
            <span className="auth-header">Input Sign up Token</span>
            <div className="auth-input-container flex-row">
              &nbsp; &nbsp; &nbsp;
              <span className="auth-input-icon">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type={`${isPasswordVisible ? "text" : "password"}`}
                className="auth-input"
                style={{
                  textTransform: "uppercase",
                }}
                spellCheck="false"
                placeholder="Sign Up Token"
                autoComplete="false"
                value={signUpToken}
                onChange={(e) => {
                  setSignUpToken(e.target.value);
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
            <button
              className="auth-btn auth-action-btn"
              onClick={verifySignUpToken}
            >
              {isVerifyingToken ? (
                <>
                  Verifying &nbsp; <i className="far fa-spinner fa-spin"></i>
                </>
              ) : (
                <>Verify</>
              )}
            </button>
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
        )}
        {componentToShow === "signup" ? (
          <SignUp token={signUpToken} passRoute={passRoute} />
        ) : componentToShow === "reset" ? (
          <ResetPassword passRoute={passRoute} />
        ) : (
          componentToShow === "login" && <Login passRoute={passRoute} />
        )}
      </div>
    </div>
  );
}
