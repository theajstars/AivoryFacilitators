import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FullLogo from "../../../Assets/IMG/LogoFull.png";

import CoursesIcon from "../../../Assets/IMG/DashboardNav/CoursesIcon.svg";
import FacilitatorsIcon from "../../../Assets/IMG/DashboardNav/FacilitatorsIcon.svg";
import FAQsIcon from "../../../Assets/IMG/DashboardNav/FAQsIcon.svg";
import HelpIcon from "../../../Assets/IMG/DashboardNav/HelpIcon.svg";
import LiveClassesIcon from "../../../Assets/IMG/DashboardNav/LiveClassesIcon.svg";
import LogoutIcon from "../../../Assets/IMG/DashboardNav/LogoutIcon.svg";
import MentorsIcon from "../../../Assets/IMG/DashboardNav/MentorsIcon.svg";
import OverviewIcon from "../../../Assets/IMG/DashboardNav/OverviewIcon.svg";

import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function DashboardNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const logoutStudent = () => {
    Cookies.remove("ud");
    navigate("/auth");
  };
  const toggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <span className="toggle-dashboard-left-nav" onClick={toggleNav}>
        {isMenuOpen ? (
          <i className="far fa-chevron-double-left"></i>
        ) : (
          <i className="far fa-chevron-double-right"></i>
        )}
      </span>
      <motion.div
        className="dashboard-nav-container flex-column"
        initial={{
          left: 0,
        }}
        animate={{
          left: isMenuOpen ? 0 : -250,
        }}
      >
        <div className="dashboard-nav flex-column">
          <div className="dashboard-nav-top flex-column">
            <img src={FullLogo} alt="" className="dashboard-nav-logo" />
            <div className="dashboard-nav-items flex-column">
              <Link to="/dashboard" className="dashboard-nav-item flex-row">
                <img src={OverviewIcon} className="dashboard-nav-item-icon" />
                <span className="dashboard-nav-item-text">Overview</span>
              </Link>
              <Link
                to="/dashboard/profile"
                className="dashboard-nav-item flex-row"
              >
                <img src={CoursesIcon} className="dashboard-nav-item-icon" />
                <span className="dashboard-nav-item-text">Profile</span>
              </Link>
              <Link
                to="/dashboard/sessions"
                className="dashboard-nav-item flex-row"
              >
                <img
                  src={LiveClassesIcon}
                  className="dashboard-nav-item-icon"
                />
                <span className="dashboard-nav-item-text">Sessions</span>
              </Link>
              <Link
                to="/dashboard/help"
                className="dashboard-nav-item flex-row"
              >
                <img src={MentorsIcon} className="dashboard-nav-item-icon" />
                <span className="dashboard-nav-item-text">Help</span>
              </Link>
            </div>
          </div>
          <Link
            to="/logout"
            className="dashboard-nav-item flex-row dashboard-nav-logout"
            onClick={(e) => {
              e.preventDefault();
              logoutStudent();
            }}
          >
            <img src={LogoutIcon} className="dashboard-nav-item-icon" />
            <span className="dashboard-nav-item-text">Logout</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
