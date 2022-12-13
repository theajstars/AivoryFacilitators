import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import CoursesOverview from "./Overview/CoursesOverview";
import TrainingsOverview from "./Overview/TrainingsOverview";

import CalendarImage from "../../../../Assets/IMG/OverviewCalendarIcon.svg";
import ClockImage from "../../../../Assets/IMG/OverviewClockIcon.svg";
import ProfileImage from "../../../../Assets/IMG/OverviewProfileIcon.svg";
import PhoneImage from "../../../../Assets/IMG/OverviewPhoneIcon.svg";

import Cookies from "js-cookie";
import { baseURL } from "../../../../App";

export default function Overview() {
  const navigate = useNavigate();
  const token = Cookies.get("ud");
  const [mentorData, setMentorData] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/facilitator/profile`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log(res);
        setMentorData(res.data.mentor);
      });
  }, []);

  return (
    <div className="dashboard-screen-container flex-column">
      <br />
      <div className="mentor-overview-items flex-column">
        <div className="mentor-overview-row flex-row">
          <div className="mentor-overview-item flex-row">
            <div className="mentor-overview-item-left flex-column">
              <div className="mentor-overview-item-header">
                View Scheduled Sessions
              </div>
              <button className="mentor-overview-item-btn">
                View Schedule
              </button>
            </div>
            <img src={CalendarImage} alt="" />
          </div>
          <div className="mentor-overview-item flex-row">
            <div className="mentor-overview-item-left flex-column">
              <div className="mentor-overview-item-header">
                Update my availability
              </div>
              <button className="mentor-overview-item-btn">
                Update Calendar
              </button>
            </div>
            <img src={ClockImage} alt="" />
          </div>
        </div>

        <div className="mentor-overview-row flex-row">
          {/* <div className="mentor-overview-item flex-row">
            <div className="mentor-overview-item-left flex-column">
              <div className="mentor-overview-item-header">
                Begin a Scheduled Session
              </div>
              <button className="mentor-overview-item-btn">Start Now</button>
            </div>
            <img src={PhoneImage} alt="" />
          </div> */}
          <div className="mentor-overview-item flex-row">
            <div className="mentor-overview-item-left flex-column">
              <div className="mentor-overview-item-header">
                Update your Mentor Profile
              </div>
              <button
                className="mentor-overview-item-btn"
                onClick={() => {
                  navigate("/dashboard/profile");
                }}
              >
                Update Profile
              </button>
            </div>
            <img src={ProfileImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
