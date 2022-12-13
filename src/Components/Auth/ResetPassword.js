import Logo from "../../Assets/IMG/Logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [passwordLinkSent, setPasswordLinkSent] = useState(false);
  const [passwordLinkSending, setPasswordLinkSending] = useState(false);

  const sendPasswordLink = () => {
    setPasswordLinkSending(true);
    setPasswordLinkSent(false);
    setTimeout(() => {
      setPasswordLinkSent(true);
      setPasswordLinkSending(false);
    }, 1500);
  };

  useEffect(() => {
    sendPasswordLink();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="auth-container reset-password-container flex-column">
      <img src={Logo} alt="" className="auth-logo" />
      <span className="auth-header">Password Reset</span>

      {passwordLinkSent && (
        <span className="form-text">
          A unique link to reset and change your password has been sent to your
          email address
        </span>
      )}
      {passwordLinkSending && (
        <span className="is-sending-password-link">
          Sending password reset link &nbsp;{" "}
          <i className="far fa-spinner fa-spin"></i>
        </span>
      )}

      {passwordLinkSent ? (
        <button className="auth-btn auth-action-btn" onClick={sendPasswordLink}>
          Resend Email
        </button>
      ) : (
        <button
          className="auth-btn auth-action-btn"
          style={{ opacity: 0.6, cursor: "not-allowed" }}
          disabled={true}
          onClick={() => props.passRoute("login")}
        >
          Resend Email
        </button>
      )}
      <center style={{ width: "100%" }}>
        <span className="form-text">
          Remembered your password?{" "}
          <b
            onClick={() => {
              props.passRoute("login");
            }}
            style={{
              cursor: "pointer",
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
            navigate("/");
          }}
        >
          <i className="far fa-long-arrow-left"></i>
          &nbsp;&nbsp;&nbsp; Back to Homepage
        </span>
      </center>
    </div>
  );
}
