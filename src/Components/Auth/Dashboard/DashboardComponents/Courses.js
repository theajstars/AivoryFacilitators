import { Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementImage from "../../../../Assets/IMG/AnnouncementImage.png";
import CourseOverviewIcon from "../../../../Assets/IMG/Overview/CourseOverviewOne.svg";

export default function Courses() {
  const [map, setMap] = useState([2, 3, 4]);
  const [shownCourses, setShownCourses] = useState("all");

  const navigate = useNavigate();
  return (
    <div className="dashboard-screen-container">
      <div className="courses-container">
        <div className="overview-jumbo courses-jumbo flex-row">
          <img src={AnnouncementImage} alt="" />
        </div>
        <div className="courses-nav flex-row">
          <span
            className={`course-nav-item ${
              shownCourses === "all" ? "course-nav-item-active" : ""
            }`}
            onClick={() => setShownCourses("all")}
          >
            All Courses
          </span>
          <span
            className={`course-nav-item ${
              shownCourses === "progress" ? "course-nav-item-active" : ""
            }`}
            onClick={() => setShownCourses("progress")}
          >
            In Progress
          </span>
          <span
            className={`course-nav-item ${
              shownCourses === "completed" ? "course-nav-item-active" : ""
            }`}
            onClick={() => setShownCourses("completed")}
          >
            Completed
          </span>
        </div>
        <div className="courses-overview-container flex-row">
          <div className="my-courses-container">
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
              alignContent="center"
            >
              {shownCourses === "all" && (
                <>
                  {map.map((elem) => {
                    return (
                      <>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <div className="course-overview-card my-course-card  flex-column">
                            <div className="course-overview-card-top flex-row">
                              <img
                                src={CourseOverviewIcon}
                                alt=""
                                className="course-overview-avatar"
                              />
                              <div className="course-overview-card-details flex-column">
                                <span className="course-overview-card-price">
                                  $2000USD
                                </span>
                                <span className="course-overview-card-title">
                                  Business Analysis and Scrum Master
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                navigate("/course");
                              }}
                              className="course-overview-button course-overview-enroll"
                            >
                              Enroll Now
                            </button>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <div className="course-overview-card my-course-card  flex-column">
                            <div className="course-overview-card-top flex-row">
                              <img
                                src={CourseOverviewIcon}
                                alt=""
                                className="course-overview-avatar"
                              />
                              <div className="course-overview-card-details flex-column">
                                <span className="course-overview-card-price">
                                  $2000USD
                                </span>
                                <span className="course-overview-card-title">
                                  Business Analysis
                                </span>
                              </div>
                            </div>
                            <span className="dashboard-text-normal">
                              {"- Business Analysis in General; - Business Analysis ".slice(
                                0,
                                40
                              )}
                              ...
                            </span>
                            <button
                              onClick={() => {
                                navigate("/course");
                              }}
                              className="course-overview-button course-overview-resume"
                            >
                              <div className="course-overview-progress"></div>
                              Resume
                            </button>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <div className="course-overview-card my-course-card flex-column">
                            <div className="course-overview-card-top flex-row">
                              <img
                                src={CourseOverviewIcon}
                                alt=""
                                className="course-overview-avatar"
                              />
                              <div className="course-overview-card-details flex-column">
                                <span className="course-overview-card-price">
                                  $2000USD
                                </span>
                                <span className="course-overview-card-title">
                                  Scrum Master
                                </span>
                              </div>
                            </div>
                            <span className="dashboard-text-normal">
                              {"- Business Analysis in General; - Business Analysis ".slice(
                                0,
                                40
                              )}
                              ...
                            </span>
                            <button
                              onClick={() => {
                                navigate("/course");
                              }}
                              className="course-overview-button course-overview-completed"
                            >
                              Completed
                            </button>
                          </div>
                        </Grid>
                      </>
                    );
                  })}
                </>
              )}

              {shownCourses === "progress" && (
                <>
                  {map.map((elem) => {
                    return (
                      <>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <div className="course-overview-card my-course-card  flex-column">
                            <div className="course-overview-card-top flex-row">
                              <img
                                src={CourseOverviewIcon}
                                alt=""
                                className="course-overview-avatar"
                              />
                              <div className="course-overview-card-details flex-column">
                                <span className="course-overview-card-price">
                                  $2000USD
                                </span>
                                <span className="course-overview-card-title">
                                  Business Analysis
                                </span>
                              </div>
                            </div>
                            <span className="dashboard-text-normal">
                              {"- Business Analysis in General; - Business Analysis ".slice(
                                0,
                                40
                              )}
                              ...
                            </span>
                            <button className="course-overview-button course-overview-resume">
                              <div className="course-overview-progress"></div>
                              Resume
                            </button>
                          </div>
                        </Grid>
                      </>
                    );
                  })}
                </>
              )}
              {shownCourses === "completed" && (
                <>
                  {map.map((elem) => {
                    return (
                      <>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <div className="course-overview-card my-course-card flex-column">
                            <div className="course-overview-card-top flex-row">
                              <img
                                src={CourseOverviewIcon}
                                alt=""
                                className="course-overview-avatar"
                              />
                              <div className="course-overview-card-details flex-column">
                                <span className="course-overview-card-price">
                                  $2000USD
                                </span>
                                <span className="course-overview-card-title">
                                  Scrum Master
                                </span>
                              </div>
                            </div>
                            <span className="dashboard-text-normal">
                              {"- Business Analysis in General; - Business Analysis ".slice(
                                0,
                                40
                              )}
                              ...
                            </span>
                            <button className="course-overview-button course-overview-completed">
                              Completed
                            </button>
                          </div>
                        </Grid>
                      </>
                    );
                  })}
                </>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
