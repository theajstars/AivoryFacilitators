import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { PlusOutlined } from "@ant-design/icons";
import { Input, message, Tag } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import axios from "axios";

import { baseURL } from "../../../../App";

import CameraIcon from "../../../../Assets/IMG/CameraIcon.svg";

export default function Profile({}) {
  const navigate = useNavigate();
  const token = Cookies.get("ud");

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mentorData, setMentorData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [calendly, setCalendly] = useState("");

  const [isProfileUpdating, setProfileUpdating] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    console.log("Page Load");

    if (mentorData._id) {
      setFirstName(mentorData.firstName);
      setLastName(mentorData.lastName);
      setBio(mentorData.bio);
      setLinkedIn(mentorData.linkedin);
      setCalendly(mentorData.calendly);
      setAvatar(mentorData.avatar);
      setQualifications(mentorData.qualifications);
    }
  }, [mentorData]);

  const updateMentorProfile = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      bio.length === 0 ||
      calendly.length === 0
    ) {
      message.warning("Please fill out the profile form!");
    } else {
      setProfileUpdating(true);
      axios
        .post(
          `${baseURL}/mentor/updateProfile`,
          {
            firstName,
            lastName,
            avatar,
            qualifications,
            bio,
            linkedIn,
            calendly,
          },
          { headers: { "x-access-token": token } }
        )
        .then((res) => {
          setProfileUpdating(false);
          console.log("Updated: ", res);
          if (res.data.auth) {
            message.success("Your profile has been updated");
            navigate("/dashboard/profile");
          } else {
            message.error("Your profile could not be updated!");
          }
        })
        .catch(() => {
          setProfileUpdating(false);
        });
    }
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
    // Fetch Mentor Profile
    axios
      .get(`${baseURL}/mentor/profile`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        console.log(res);
        setMentorData(res.data.mentor);
      });
  }, []);

  const handleClose = (removedQualification) => {
    const newQualifications = qualifications.filter(
      (qualification) => qualification !== removedQualification
    );
    console.log(newQualifications);
    setQualifications(newQualifications);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && qualifications.indexOf(inputValue) === -1) {
      setQualifications([...qualifications, inputValue]);
    }

    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };

  const tagChild = qualifications.map(forMap);
  return (
    <div className="dashboard-screen-container flex-column">
      <br />
      <br />
      <br />
      <div className="settings-container">
        <div className="settings-top-row flex-row">
          <img src={avatar} alt="" className="mentor-avatar" />

          <div className="settings-top-row-right flex-column">
            <div className="settings-top-input-row flex-row">
              <input
                type="text"
                placeholder="First Name (Required)"
                className="settings-input"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Last Name (Required)"
                className="settings-input"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: "from",
                  duration: 100,
                }}
                onEnd={(e) => {
                  if (e.type === "appear" || e.type === "enter") {
                    e.target.style = "display: inline-block";
                  }
                }}
                leave={{
                  opacity: 0,
                  width: 0,
                  scale: 0,
                  duration: 200,
                }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>
            </div>
            {inputVisible && (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{
                  width: 78,
                }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={showInput}
                className="site-tag-plus"
                style={{
                  width: "fit-content",
                }}
              >
                <PlusOutlined /> New Qualification
              </Tag>
            )}
          </div>
        </div>
      </div>

      <div className="settings-bottom-column mentor-dashboard-profile-bottom flex-column">
        <textarea
          name=""
          id=""
          cols="30"
          maxLength={2000}
          rows="10"
          spellCheck="false"
          placeholder="Bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          className="mentor-dashboard-bio"
        ></textarea>
        <input
          type="text"
          className="settings-input mentor-dashboard-input"
          placeholder="LinkedIn"
          value={linkedIn}
          onChange={(e) => {
            setLinkedIn(e.target.value);
          }}
        />
        <input
          type="text"
          className="settings-input mentor-dashboard-input"
          placeholder="Calendly Link (Required)"
          value={calendly}
          onChange={(e) => {
            setCalendly(e.target.value);
          }}
        />
        <button
          className="send-help-message-button"
          onClick={updateMentorProfile}
        >
          {isProfileUpdating ? (
            <>
              Updating <i className="far fa-spinner fa-spin"></i>
            </>
          ) : (
            <>Update Profile</>
          )}
        </button>
      </div>
    </div>
  );
}
