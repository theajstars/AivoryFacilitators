import { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import { baseURL } from "../../../../App";
import { message } from "antd";

export default function Help() {
  const token = Cookies.get("ud");
  const [sessions, setSessions] = useState(false);
  const [profileOrSettings, setProfileOrSettings] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const [isMessageSending, setMessageSending] = useState(false);

  const sendMessage = () => {
    if (messageTitle.length === 0 || messageBody.length === 0) {
      message.error("Please fill out the help form!");
    } else {
      if (!sessions && !profileOrSettings) {
        message.error("You must select a help topic");
      } else {
        if (messageTitle.length > 0 && messageBody.length > 0) {
          setMessageSending(true);
          axios
            .post(
              `${baseURL}/mentor/getHelp`,
              { sessions, profileOrSettings, messageTitle, messageBody },
              { headers: { "x-access-token": token } }
            )
            .then((res) => {
              setMessageSending(false);
              if (res.data.auth) {
                message.success("Your message was delivered successfully!");
                setMessageTitle("");
                setMessageBody("");
              } else {
                message.error("Your message could not be delivered!");
              }
            })
            .catch(() => {
              setMessageSending(false);
            });
        }
      }
    }
    console.log({ sessions, profileOrSettings, messageTitle, messageBody });
  };
  return (
    <div className="dashboard-screen-container">
      <div className="help-container flex-column">
        <span className="help-header">What can we help you with?</span>
        <div className="flex-column help-items-column">
          <div className="flex-row help-items-row">
            <div className="help-item-row flex-row">
              <input
                type="checkbox"
                name=""
                checked={sessions}
                onChange={(e) => {
                  setSessions(e.target.checked);
                }}
                id=""
                className="help-item-checkbox"
              />
              <span className="help-item-title">Sessions</span>
            </div>
            <div className="help-item-row flex-row">
              <input
                type="checkbox"
                name=""
                id=""
                checked={profileOrSettings}
                onChange={(e) => {
                  setProfileOrSettings(e.target.checked);
                }}
                className="help-item-checkbox"
              />
              <span className="help-item-title">Profile / Settings</span>
            </div>
          </div>
        </div>

        <input
          type="text"
          className="help-title-input"
          value={messageTitle}
          onChange={(e) => {
            setMessageTitle(e.target.value);
          }}
          placeholder="Title"
          spellCheck={false}
        />
        <textarea
          className="help-message-input"
          spellCheck={false}
          value={messageBody}
          onChange={(e) => {
            setMessageBody(e.target.value);
          }}
          placeholder="Message..."
        ></textarea>
        <button className="send-help-message-button" onClick={sendMessage}>
          {isMessageSending ? (
            <>
              Sending <i className="far fa-spinner fa-spin"></i>
            </>
          ) : (
            <>Send Message</>
          )}
        </button>
      </div>
    </div>
  );
}
