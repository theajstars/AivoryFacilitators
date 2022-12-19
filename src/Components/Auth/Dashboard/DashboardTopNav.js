import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { List } from "antd";

import Cookies from "js-cookie";
import axios from "axios";
import { motion } from "framer-motion";

import { baseURL } from "../../../App";
export default function DashboardTopNav({ navtext, data }) {
  const token = Cookies.get("ud");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [path, setPath] = useState("");
  const [isOverview, setIsOverview] = useState("");
  const [navTextOne, setNavTextOne] = useState("");
  const [navTextTwo, setNavTextTwo] = useState("");
  const [navTextThree, setNavTextThree] = useState("");

  const [facilitatorData, setFacilitatorData] = useState(data);

  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  useEffect(() => {
    // Fetch Facilitator Profile
    axios
      .get(`${baseURL}/facilitator/profile`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log(res);
        setFacilitatorData(res.data.facilitator);
      });

    // Fetch Notifications
    axios
      .get(`${baseURL}/mentor/getAdminNotifications`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log(res);
        if (res.data.auth) {
          setNotifications(res.data.notifications);
        }
        // setFacilitatorData(res.data.facilitator);
      });
  }, []);
  useEffect(() => {
    const d = new Date(Date.now());
    const hours = d.getHours();
    if (hours >= 12 && hours < 16) {
      setTimeOfDay("afternoon");
    } else if (hours > 3 && hours < 12) {
      setTimeOfDay("morning");
    } else {
      setTimeOfDay("night");
    }
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const location = useLocation();
  useEffect(() => {
    const pathName = location.pathname;
    const pathNameLength = pathName.length;
    const lastIndex = pathName.lastIndexOf("/");
    const thisPath = pathName.substring(lastIndex + 1, pathNameLength);
    setPath(thisPath);
    setIsOverview(thisPath === "dashboard" ? true : false);
  }, [location]);

  useEffect(() => {
    console.log(path);
    console.log(navtext);
    if (navtext) {
      setNavTextOne(navtext.NavTextOne);
      setNavTextTwo(navtext.NavTextTwo);
      setNavTextThree(navtext.NavTextThree);
    } else {
      if (path === "help") {
        setNavTextOne("Get");
        setNavTextTwo("Support");
        setNavTextThree("Let us know how we can be of help");
      } else if (path === "dashboard") {
        setNavTextOne("Register & Access");
        setNavTextTwo("Courses");
        setNavTextThree("Classes are ongoing. Join now!");
      } else if (path === "profile") {
        setNavTextOne("Update your");
        setNavTextTwo("Profile");
        setNavTextThree("Help students know you better");
      } else if (path === "sessions") {
        setNavTextOne("Good Morning ");
        setNavTextTwo(facilitatorData.firstName);
        setNavTextThree("Help students know you better");
      }
    }
  }, [path]);
  return (
    <div className="dashboard-top-nav-container flex-row">
      <div className="dashboard-top-nav flex-row">
        {isOverview ? (
          <div className="dashboard-top-nav-left flex-column">
            <span className="dashboard-top-nav-header flex-row">
              <span className="good-morning-text">Good {timeOfDay},</span>
              <span>{facilitatorData.firstName}</span>
            </span>
            <span className="dashboard-text-normal">
              Today is a great day. Let's learn something new today.
            </span>
          </div>
        ) : (
          <div className="dashboard-top-nav-left flex-column">
            <span className="dashboard-top-nav-header flex-row">
              <span className="good-morning-text">{navTextOne}</span>
              <span>{navTextTwo}</span>
            </span>
            <span className="dashboard-text-normal">{navTextThree}</span>
          </div>
        )}
        <div className="dashboard-top-nav-right flex-row">
          <div className="dashboard-nav-search-container flex-row">
            <input
              type="text"
              className="dashboard-nav-search"
              placeholder="Search..."
              spellCheck="false"
              onLoad={(e) => {
                e.target.value = "";
              }}
            />
            <span className="dashboard-nav-search-icon">
              <i className="far fa-search"></i>
            </span>
          </div>
          {/* <span
            className="dashboard-top-nav-notification-icon flex-row"
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
          >
            <i className="fas fa-bell"></i>
          </span> */}
          <motion.div
            className="notifications-container"
            animate={{
              height: isNotificationsOpen ? "500px" : "0px",
              paddingBottom: "0px",
              padding: isNotificationsOpen ? "20px" : "0px",
              overflowY: isNotificationsOpen ? "scroll" : "clip",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              style={{
                width: "300px",
              }}
              renderItem={(n) => (
                <List.Item>
                  <List.Item.Meta
                    style={{
                      textTransform: "capitalize",
                    }}
                    title={<>{n.messageTitle}</>}
                    description={n.messageBody}
                  />
                </List.Item>
              )}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
