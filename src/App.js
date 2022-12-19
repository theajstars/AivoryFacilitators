import "./All.css";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

// const baseURL = `http://localhost:8080`;
const baseURL = `https://aivorytech.herokuapp.com`;
const verifyAdminToken = async (token) => {
  const result = await axios.get(`${baseURL}/admin/verifyToken`, {
    headers: { "x-access-token": token },
  });
  return result;
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function App() {
  const token = Cookies.get("ud");

  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/auth" />;
  }
}
export { baseURL, verifyAdminToken, validateEmail };
