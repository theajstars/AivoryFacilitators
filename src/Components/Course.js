import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

import DashboardNav from "./Auth/Dashboard/DashboardNav";
import DashboardRightNav from "./Auth/Dashboard/DashboardRightNav";
import DashboardTopNav from "./Auth/Dashboard/DashboardTopNav";

import { baseURL, verifyAdminToken } from "../App";

import ProfileAvatar from "../Assets/IMG/StudentAvatar.svg";
import VisioLogo from "../Assets/IMG/VisioTool.png";
import JiraSoftwareLogo from "../Assets/IMG/JiraSoftwareTool.png";

export default function Course() {
  const params = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("ud");

  const [adminObject, setAdminObject] = useState({
    avatar: "",
    email: false,
    firstName: "",
    lastName: "",
  });
  useEffect(() => {
    console.log(params);
    verifyAdminToken(token).then((res) => {
      if (!res.data.token) {
        // Token is not valid
        Cookies.remove("ud");
        navigate("/auth");
      } else {
        //Token is valid so fetch Admin details
        axios
          .get(`${baseURL}/admin/profile`, {
            headers: { "x-access-token": token },
          })
          .then((response) => {
            console.log(response);
            setAdminObject(response.data.admin);
          });
      }
    });
  }, []);
  const NAV_TOP_TEXT = {
    NavTextOne: "Register & Access",
    NavTextTwo: "Courses",
    NavTextThree: "Classes are ongoing. Join now!",
  };
  const [isMenuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="dashboard-container flex-row">
        <DashboardNav />
        <div className="dashboard-screen">
          <DashboardTopNav navtext={NAV_TOP_TEXT} />
          <div className="dashboard-screen-parent">
            <div className="dashboard-screen-container">
              <div className="overview-jumbo course-jumbo flex-column">
                <span className="course-title">Business Analysis</span>
                <button className="course-register-now">Register Now</button>
              </div>
              <div className="course-container">
                {/* Course content goes here */}
                <div className="course-details flex-row">
                  <span className="course-detail flex-row">
                    <span className="course-detail-tag">Fee:</span>
                    <span className="course-detail-value">$1500USD</span>
                  </span>
                  <span className="course-detail flex-row">
                    <span className="course-detail-tag">Duration:</span>
                    <span className="course-detail-value">7 - 8 Weeks</span>
                  </span>
                  <span className="course-detail flex-row">
                    <span className="course-detail-tag">Days:</span>
                    <span className="course-detail-value">
                      Monday - Thursday
                    </span>
                  </span>
                  <span className="course-detail flex-row">
                    <span className="course-detail-tag">Fee</span>
                    <span className="course-detail-value">$1500USD</span>
                  </span>
                  <span className="course-detail flex-row">
                    <span className="course-detail-tag">+</span>
                    <span className="course-detail-value">
                      2 free mentor sessions
                    </span>
                  </span>
                </div>

                <div className="course-section-header-container flex-row">
                  <div className="course-section-header course-outline-section-header">
                    Course Outline
                  </div>
                  <hr className="course-section-header-rule" />
                </div>
                <center>
                  <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                    alignContent="center"
                  >
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 1
                        </span>
                        <span className="course-outline-lesson-value">
                          Business Analysis in General
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 2
                        </span>
                        <span className="course-outline-lesson-value">
                          Business Analysis Knowledge Areas & Introduction to
                          Key Concepts
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 3
                        </span>
                        <span className="course-outline-lesson-value">
                          Business Process Improvement - Current Business Case
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 4
                        </span>
                        <span className="course-outline-lesson-value">
                          Software Development Lifecycle
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 5
                        </span>
                        <span className="course-outline-lesson-value">
                          Business Analysis Approach & Stakeholder Management
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 6
                        </span>
                        <span className="course-outline-lesson-value">
                          Requirements Elicitation and Requirements Lifecycle
                          Management
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 7
                        </span>
                        <span className="course-outline-lesson-value">
                          Risk Assessment and Risk Management
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 8
                        </span>
                        <span className="course-outline-lesson-value">
                          Business Process Improvement - Current State, Future
                          State and Design Decisions
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 9
                        </span>
                        <span className="course-outline-lesson-value">
                          Requirements Analysis & Design Definition
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <div className="course-outline-item flex-column">
                        <span className="course-outline-lesson-tag">
                          Lesson 10
                        </span>
                        <span className="course-outline-lesson-value">
                          Solution Evaluation
                        </span>
                      </div>
                    </Grid>
                  </Grid>
                </center>

                <div className="course-container-bottom flex-row">
                  <div className="course-container-bottom-left flex-column">
                    <div className="course-section-header-container flex-row">
                      <div className="course-section-header tools-taught-section-header">
                        Tools Taught
                      </div>
                      <hr className="course-section-header-rule" />
                    </div>
                    <div className="tools-taught flex-row">
                      <img
                        src={VisioLogo}
                        alt=""
                        className="course-tool-taught"
                      />
                      <img
                        src={JiraSoftwareLogo}
                        alt=""
                        className="course-tool-taught"
                      />
                    </div>
                  </div>
                  <div className="course-container-bottom-right flex-column">
                    <div className="course-section-header-container flex-row">
                      <div className="course-section-header faq-section-header">
                        Frequently Asked Questions
                      </div>
                      <hr className="course-section-header-rule" />
                    </div>
                    <div className="frequently-asked-questions flex-column">
                      <div className="faq">
                        <b>Is it a one-time fee?</b>
                        Yes it is
                      </div>
                      <div className="faq">
                        <b>
                          Do I need to have a technical background to transition
                          into working as Business Analyst or Scrum Master?
                        </b>
                        No, by getting trained on Business Analysis and Scrum,
                        then leveraging your transferable skill, you can
                        transition into these fields
                      </div>
                      <div className="faq">
                        <b>Are classes live or pre-recorded?</b>
                        All classes are live and students will have access 1
                        year access to recordings of the class they registered
                        for
                      </div>
                      <div className="faq">
                        <b>How can I make payment?</b>
                        Click on the Register button. After that you will be
                        directed to a page where you can pay with your card or
                        through Zelle
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  src={adminObject.avatar}
                  alt=""
                  className="dashboard-profile-avatar"
                />
                <div className="dashboard-profile-details flex-column">
                  <span className="dashboard-profile-name">
                    {adminObject.firstName} {adminObject.lastName[0]}.
                  </span>
                  <span className="dashboard-profile-title">
                    {"Workspace Manager"}
                  </span>
                </div>
              </div>
              <span className="dashboard-right-nav-settings flex-row">
                <i className="fas fa-cog"></i>
              </span>
            </motion.div>
            <DashboardRightNav />
          </div>
        </motion.div>
      </div>
    </>
  );
}
