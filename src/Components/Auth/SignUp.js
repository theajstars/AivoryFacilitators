import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

import { baseURL, validateEmail } from "../../App";

import Logo from "../../Assets/IMG/Logo.png";
import GoogleIcon from "../../Assets/IMG/GoogleIcon.svg";

export default function SignUp(props) {
  const navigate = useNavigate();
  const facilitatorToken = props.token;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [isCreatingAccount, setCreatingAccount] = useState(false);

  const createMentor = () => {
    if (firstName.length === 0 || lastName.length === 0) {
      message.warning("Please provide your full name");
    } else {
      if (password.length < 8) {
        message.warning("Password must be at least 8 characters");
      } else if (!validateEmail(email)) {
        message.warning("Please enter a valid Email!");
      }
    }
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      validateEmail(email) &&
      password.length > 7
    ) {
      setCreatingAccount(true);
      axios
        .post(`${baseURL}/facilitator/register`, {
          email,
          firstName,
          lastName,
          password,
          facilitatorToken,
        })
        .then((res) => {
          setCreatingAccount(false);

          console.log(res);
          if (res.data.accountFound) {
            //Acount already exists
            message.error("Email already taken!");
          } else {
            if (res.data.auth) {
              Cookies.set("ud", res.data.token);
              message.success("Profile created successfully!");
              navigate("/dashboard");
              // props.passRoute("dashboard");
            } else {
              message.error("There was an error creating your profile");
            }
          }
        })
        .catch(() => {
          setCreatingAccount(false);
        });
    }
  };
  return (
    <div className="auth-container signup-container flex-column">
      <img src={Logo} alt="" className="auth-logo" />
      <span className="auth-header">Create your Account</span>

      <div className="auth-input-row flex-row">
        <div className="auth-input-container flex-row">
          &nbsp; &nbsp; &nbsp;
          <span className="auth-input-icon">
            <i className="fas fa-user"></i>
          </span>
          <input
            type="text"
            className="auth-input"
            spellCheck="false"
            placeholder="First Name"
            autoComplete="false"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            name="adsnfiiu89e2hy43ub8ihasd"
          />
        </div>
        <div className="auth-input-container flex-row">
          &nbsp; &nbsp; &nbsp;
          <span className="auth-input-icon">
            <i className="fas fa-user"></i>
          </span>
          <input
            type="text"
            className="auth-input"
            spellCheck="false"
            placeholder="Last Name"
            autoComplete="false"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            name="adsnfiiu89e2hy43ub8ihasd"
          />
        </div>
      </div>
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
          type="password"
          className="auth-input"
          spellCheck="false"
          placeholder="Password"
          autoComplete="false"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button className="auth-btn auth-action-btn" onClick={createMentor}>
        {isCreatingAccount ? (
          <>
            Sign Up &nbsp; <i className="far fa-spinner fa-spin"></i>
          </>
        ) : (
          <>Sign Up</>
        )}
      </button>

      <center style={{ width: "100%" }}>
        <span className="form-text">
          Have an account?{" "}
          <b
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              props.passRoute("login");
            }}
          >
            Login
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
