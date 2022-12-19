import { useState, useEffect } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";

import Overview from "./DashboardComponents/Overview";
import DashboardNav from "./DashboardNav";
import DashboardRightNav from "./DashboardRightNav";
import DashboardTopNav from "./DashboardTopNav";

import ProfileAvatar from "../../../Assets/IMG/StudentAvatar.svg";
import Help from "./DashboardComponents/Help";
import LiveClasses from "./DashboardComponents/LiveClasses";
import Courses from "./DashboardComponents/Courses";
import Settings from "./DashboardComponents/Settings";
import Profile from "./DashboardComponents/Profile";
import { baseURL } from "../../../App";
import { message } from "antd";
import Training from "../../Training";

export default function Dashboard() {
  const location = useLocation();
  const token = Cookies.get("ud");
  const navigate = useNavigate();
  const [facilitatorData, setFacilitatorData] = useState({});
  const [notifications, setNotifications] = useState([]);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const fetchFacilitatorDetails = () => {
    axios
      .get(`${baseURL}/facilitator/profile`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {});
  };
  useEffect(() => {
    fetchFacilitatorDetails();
    // Fetch Notifications
  }, []);
  useEffect(() => {
    const { pathname } = location;
    if (pathname !== "/dashboard/profile") {
      //User is not on profile page
      axios
        .get(`${baseURL}/facilitator/profile`, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          console.log(res);
          if (res.data.auth) {
            setFacilitatorData(res.data.facilitator);
          } else {
            navigate("/auth");
          }
        });
    }
  }, [location]);
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      // Verify Token
      axios
        .get(`${baseURL}/facilitator/verifyToken`, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          // console.log(res);
          if (!res.data.token) {
            Cookies.remove("ud");
            navigate("/auth");
          } else {
            //Fetch Facilitator Details
            fetchFacilitatorDetails();
          }
        });
    }
  }, []);

  useEffect(() => {
    if (!facilitatorData._id) {
      fetchFacilitatorDetails();
    }
  }, [facilitatorData]);
  return (
    <>
      {facilitatorData.email && (
        <div className="dashboard-container flex-row">
          <DashboardNav />
          <div className="dashboard-screen">
            <DashboardTopNav data={facilitatorData} />
            <div className="dashboard-screen-parent">
              <Routes>
                <Route
                  path="/"
                  element={<Overview data={facilitatorData} />}
                ></Route>
                <Route
                  path="/help"
                  element={<Help data={facilitatorData} />}
                ></Route>
                <Route path="/live" element={<LiveClasses />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/training" element={<Training />}></Route>

                <Route path="/settings" element={<Settings />}></Route>
              </Routes>
            </div>
          </div>
          <motion.span
            className="toggle-dashboard-right-nav"
            onClick={toggleMenu}
            initial={{
              marginRight: 20,
            }}
            animate={{
              marginRight: isMenuOpen ? 290 : 20,
            }}
          >
            <i className="far fa-bars"></i>
          </motion.span>
          <motion.div
            className="dashboard-right-container"
            initial={{
              right: 0,
            }}
            animate={{
              right: isMenuOpen ? 0 : -320,
            }}
          >
            <div className="dashboard-right-nav">
              <motion.div
                className="dashboard-right-nav-top flex-row"
                initial={{
                  right: -320,
                }}
                animate={{
                  right: isMenuOpen ? 0 : -320,
                }}
              >
                <div className="dashboard-profile-row flex-row">
                  <img
                    src={facilitatorData.avatar}
                    alt=""
                    className="dashboard-profile-avatar"
                  />
                  <div className="dashboard-profile-details flex-column">
                    <span className="dashboard-profile-name">
                      {facilitatorData.firstName}{" "}
                      {facilitatorData.lastName
                        ? facilitatorData.lastName[0]
                        : facilitatorData.lastName}
                      .
                    </span>
                    <span className="dashboard-profile-title">Facilitator</span>
                  </div>
                </div>
                <span
                  className="dashboard-right-nav-settings flex-row"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <i className="fas fa-cog"></i>
                </span>
              </motion.div>
              <DashboardRightNav />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
