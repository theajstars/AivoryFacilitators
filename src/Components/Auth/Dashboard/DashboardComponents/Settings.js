import { useState, useEffect } from "react";

import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import { baseURL } from "../../../../App";

export default function Settings() {
  const token = Cookies.get("ud");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isPasswordUpdating, setPasswordUpdating] = useState(false);

  const updatePassword = () => {
    const isPasswordValid = function (password) {
      return password.length >= 8;
    };

    if (
      isPasswordValid(oldPassword) &&
      isPasswordValid(newPassword) &&
      isPasswordValid(confirmNewPassword) &&
      newPassword === confirmNewPassword
    ) {
      setPasswordUpdating(true);
      //Send Request to DB
      axios
        .post(
          `${baseURL}/mentor/updatePassword`,
          { oldPassword, newPassword },
          { headers: { "x-access-token": token } }
        )
        .then((res) => {
          console.log(res);
          setPasswordUpdating(false);
          setNewPassword("");
          setConfirmNewPassword("");
          setOldPassword("");
          if (res.data.auth) {
            message.success("Your password was successfully changed!");
          } else {
            message.error("There was an error updating your password!");
          }
        })
        .catch(() => {
          setPasswordUpdating(false);
        });
    } else {
      if (!isPasswordValid(oldPassword) || !isPasswordValid(newPassword)) {
        message.error("Please input a valid password");
      } else {
        if (newPassword !== confirmNewPassword) {
          message.error("Your passwords do not match!");
        }
      }
    }
  };
  return (
    <div className="dashboard-screen-container flex-column">
      <div className="settings-container">
        {/* <div className="settings-top-row flex-row">
          <div className="upload-profile-picture flex-column">
            <img src={CameraIcon} alt="" />
            CHOOSE PHOTO
          </div>
          <div className="settings-top-row-right flex-column">
            <div className="settings-top-input-row flex-row">
              <input
                type="text"
                placeholder="First Name"
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="settings-input"
              />
            </div>
            <select
              name=""
              placeholder="Select Time Zone"
              id=""
              className="settings-dropdown"
            ></select>
            <div className="settings-top-button-row flex-row">
              <button className="send-help-message-button">
                Update Profile
              </button>
            </div>
          </div>
        </div> */}

        <div className="settings-bottom-column flex-column">
          <div className="settings-bottom-header">Change Password</div>
          <input
            type="password"
            placeholder="Current Password"
            className="settings-input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="settings-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="settings-input"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div className="settings-top-bottom-row flex-row">
          <button className="send-help-message-button" onClick={updatePassword}>
            {isPasswordUpdating ? (
              <>
                Updating&nbsp; <i className="far fa-spinner fa-spin"></i>
              </>
            ) : (
              <>Update Password</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
