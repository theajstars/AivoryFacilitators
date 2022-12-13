import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import axios from "axios";
import { Button, Input, message, Popconfirm, Radio, Table, Tag } from "antd";
import Cookies from "js-cookie";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import { baseURL, validateEmail, verifyAdminToken } from "../App";

import DashboardNav from "./Auth/Dashboard/DashboardNav";
import DashboardRightNav from "./Auth/Dashboard/DashboardRightNav";
import DashboardTopNav from "./Auth/Dashboard/DashboardTopNav";

import ProfileAvatar from "../Assets/IMG/StudentAvatar.svg";
import VisioLogo from "../Assets/IMG/VisioTool.png";
import JiraSoftwareLogo from "../Assets/IMG/JiraSoftwareTool.png";

export default function Training() {
  const params = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("ud");

  const [adminObject, setAdminObject] = useState({
    avatar: "",
    email: false,
    firstName: "",
    lastName: "",
  });

  const [isTrainingSet, setTrainingSet] = useState(false);
  const [trainingDetails, setTrainingDetails] = useState({});
  const [studentInvitationLink, setStudentInvitationLink] = useState("");

  const [registeredStudents, setRegisteredStudents] = useState([]);
  const studentColumns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const fetchTrainingStudents = () => {
    axios
      .post(
        `${baseURL}/training/getStudents`,
        { trainingID: params.trainingID },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        console.log("Training Students", res);
        const { auth, students } = res.data;
        if (auth) {
          setRegisteredStudents(students);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [newStudentEmail, setNewStudentEmail] = useState("");
  const addStudent = () => {
    const isEmailValid = validateEmail(newStudentEmail);
    if (!isEmailValid) {
      message.error("Please enter a valid email address!");
    } else {
      if (trainingDetails.trainingStudents.includes(newStudentEmail)) {
        //Student is already in training
        message.info("Student is already in training!");
      } else {
        axios
          .post(
            `${baseURL}/training/addStudent`,
            { email: newStudentEmail, trainingID: trainingDetails.trainingID },
            { headers: { "x-access-token": token } }
          )
          .then((res) => {
            console.log(res);
            if (res.data.noStudent) {
              message.error("No student exists with such email!");
            } else {
              if (res.data.auth) {
                message.success("Student added to training!");
                fetchTrainingStudents();
              } else {
                message.error("Student could not be added!");
              }
            }
          });
      }
    }
  };
  useEffect(() => {
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
    if (!params.trainingID) {
      navigate("/dashboard/live");
    } else {
      const trainingID = params.trainingID;
      // Fetch training details
      axios
        .post(
          `${baseURL}/admin/training/getDetails`,
          { trainingID },
          { headers: { "x-access-token": token } }
        )
        .then((res) => {
          console.log(res);
          if (res.data.isTraining) {
            setTrainingSet(true);
            setTrainingDetails(res.data.training);
          }
        });

      // Fetch Training Students and render them in a table

      fetchTrainingStudents();
    }
  }, []);
  const NAV_TOP_TEXT = {
    NavTextOne: "Training",
    NavTextTwo: "",
    NavTextThree: "Take a training!",
  };
  const [isMenuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const continueTraining = () => {};
  const startTraining = () => {
    window
      .open(
        `https://zoom.us/oauth/authorize?response_type=code&client_id=90DgkFXUTMec5TeysOT0fg&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fzoom%2Fauth`
      )
      .addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          window.close();
        }, 2000);
      });
    axios
      .get(`${baseURL}/zoom/startTrainingMeeting`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log("Meeting Info", res);
        if (res.data.auth) {
          const meetingDetails = res.data.meetingFound;
          window.open(meetingDetails.meetingURL);
        }
      });
  };

  const sendInviteToStudents = () => {
    axios
      .post(
        `${baseURL}/training/inviteStudents`,
        { trainingID: params.trainingID, studentInvitationLink },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.auth) {
          message.success("Invite delivered successfully!");
        }
      });
  };

  const completeTraining = () => {
    axios
      .post(
        `${baseURL}/training/markAsComplete`,
        {
          trainingID: trainingDetails.trainingID,
        },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        console.log(res);
        const { auth } = res.data;
        if (auth) {
          message.success("Successfully completed!");
        } else {
          message.error("Could not complete training");
        }
      });
  };



  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");





  const sendMessage = () => {
      if (messageTitle.length === 0 || messageBody.length === 0) {
        message.warning("You must complete the form");
      } else {
        if (
          messageTitle.length > 0 &&
          messageBody.length > 0
        ) {
          console.log({
            messageTitle,
            messageBody,
          });
          axios
            .post(
              `${baseURL}/training/sendAdminMessage`,
              {
                trainingID: trainingDetails.trainingID,
                title: messageTitle,
                message: messageBody
              },
              { headers: { "x-access-token": token } }
            )
            .then((res) => {
              console.log(res);
              if (res.data.auth) {
                message.success("Your message has been delivered!");
                setMessageTitle("");
                setMessageBody("");
              } else {
                message.error("Your message could not be delivered!");
              }
            });
        }
      }

  };

  return (
    <>
      <div className="dashboard-container flex-row">
        <DashboardNav />
        <div className="dashboard-screen">
          <DashboardTopNav navtext={NAV_TOP_TEXT} />
          {isTrainingSet && (
            <div className="dashboard-screen-parent">
              <div className="dashboard-screen-container">
                <div className="overview-jumbo course-jumbo flex-column">
                  <span
                    className="course-title"
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {trainingDetails.trainingTitle}
                  </span>
                  {!trainingDetails.trainingCompleted && (
                    <>
                      <div className="flex-row">
                        <button
                          className="course-register-now"
                          onClick={() => {
                            trainingDetails.trainingStarted
                              ? continueTraining()
                              : startTraining();
                          }}
                        >
                          {trainingDetails.trainingStarted
                            ? "Continue Training Now"
                            : "Start Training"}
                        </button>
                        &nbsp; &nbsp; &nbsp;
                        <Popconfirm
                          onConfirm={completeTraining}
                          title="Confirm training has been completed?"
                        >
                          <button
                            className="course-overview-button course-overview-completed"
                            style={{
                              marginTop: "20px",
                            }}
                          >
                            Complete training
                          </button>
                        </Popconfirm>
                      </div>
                      <center>
                        <div className="send-student-invitation-container flex-row">
                          <Input
                            placeholder="Student Invitation Link"
                            value={studentInvitationLink}
                            onChange={(e) => {
                              setStudentInvitationLink(e.target.value);
                            }}
                          />
                          <Button onClick={sendInviteToStudents}>
                            Send Invitation
                          </Button>
                        </div>
                      </center>
                    </>
                  )}
                  {trainingDetails.trainingCompleted && (
                    <Tag color="#87d068">Training has been completed!</Tag>
                  )}
                </div>
                <div className="course-container">
                  {/* Training content goes here */}
                  <div className="course-details flex-row">
                    <span className="course-detail flex-row">
                      <span className="course-detail-tag">Fee:</span>
                      <span className="course-detail-value">
                        ${trainingDetails.trainingPrice}USD
                      </span>
                    </span>
                    <span className="course-detail flex-row">
                      <span className="course-detail-tag">Duration:</span>
                      <span className="course-detail-value">
                        {trainingDetails.trainingDuration}Weeks
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
                      Training Outline
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
                      {trainingDetails.trainingLessons.map((trainingLesson) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            key={`lesson_id_${trainingLesson.id}`}
                          >
                            <div className="course-outline-item flex-column">
                              <span className="course-outline-lesson-tag">
                                Lesson {trainingLesson.id}
                              </span>
                              <span className="course-outline-lesson-value">
                                {trainingLesson.title}
                              </span>
                            </div>
                          </Grid>
                        );
                      })}
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
                      <Grid
                        container
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                      >
                        {trainingDetails.trainingToolsTaught.map(
                          (tool, index) => {
                            return (
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                <span className="tools-taught-text">
                                  {tool}
                                </span>
                              </Grid>
                            );
                          }
                        )}
                      </Grid>
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
                            Do I need to have a technical background to
                            transition into working as Business Analyst or Scrum
                            Master?
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
          )}
          <h3>Training Students</h3>
          <br />
          <div className="flex-row">
            <Input
              placeholder="Student Email"
              style={{ width: "300px" }}
              value={newStudentEmail}
              onChange={(e) => {
                setNewStudentEmail(e.target.value);
              }}
            />
            &nbsp;&nbsp;
            <Button type="primary" onClick={addStudent}>
              Add New Student
            </Button>
          </div>
          <br />
          <br />
          <br />

          <Table dataSource={registeredStudents} columns={studentColumns} />
          <div className="help-container training-help-container flex-column">
            <span className="help-header">Message Delivery</span>
            <input
              type="text"
              className="help-title-input"
              placeholder="Title"
              spellCheck={false}
              value={messageTitle}
              onChange={(e) => {
                setMessageTitle(e.target.value);
              }}
            />
            <textarea
              className="help-message-input"
              spellCheck={false}
              placeholder="Message..."
              value={messageBody}
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
            ></textarea>
            <button className="send-help-message-button" onClick={sendMessage}>
              Send Message
            </button>
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
