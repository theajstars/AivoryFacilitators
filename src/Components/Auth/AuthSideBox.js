import React from "react";
import WomanSitting from "../../Assets/IMG/womansittingwithlaptop.png";
import ManSitting from "../../Assets/IMG/mansittingwithphone.png";
import WomanWaving from "../../Assets/IMG/womanwavingtoman.png";

export default function AuthSideBox() {
  return (
    <div className="auth-sidebox-container">
      <div className="auth-sidebox flex-column">
        <div className="auth-sidebox-row flex-row">
          <img src={WomanSitting} alt="" className="auth-sidebox-image" />
          <div className="flex-column auth-sidebox-content">
            <span className="auth-sidebox-number">1</span>
            <div className="auth-sidebox-text">
              Update your profile and availability
            </div>
          </div>
        </div>
        <div className="auth-sidebox-row flex-row">
          <img src={ManSitting} alt="" className="auth-sidebox-image" />
          <div className="flex-column auth-sidebox-content">
            <span className="auth-sidebox-number">2</span>
            <div className="auth-sidebox-text">View Scheduled Sessions</div>
          </div>
        </div>
        <div className="auth-sidebox-row flex-row">
          <img src={WomanWaving} alt="" className="auth-sidebox-image" />
          <div className="flex-column auth-sidebox-content">
            <span className="auth-sidebox-number">3</span>
            <div className="auth-sidebox-text">Host Scehduled Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
