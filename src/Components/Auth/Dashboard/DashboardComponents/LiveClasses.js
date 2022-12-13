import LiveClassCalendarImage from "../../../../Assets/IMG/LiveClassCalendar.png";
import { useNavigate } from "react-router-dom";
export default function LiveClasses() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-screen-container">
      <div className="live-classes-container">
        <div className="overview-jumbo live-classes-jumbo flex-row">
          <span className="live-class-icon flex-row">
            <i className="fas fa-play"></i>
          </span>
        </div>
        <div className="no-live-class-card flex-row">
          <div className="no-live-class-left flex-column">
            <span className="dashboard-text-normal">No live class?</span>
            <span className="no-live-class-header">
              Schedule a session with a Mentor
            </span>
            <button
              onClick={() => {
                navigate("/dashboard/mentors");
              }}
              className="send-help-message-button schedule-live-class-button"
            >
              Schedule now
            </button>
          </div>
          <img src={LiveClassCalendarImage} alt="" />
        </div>
      </div>
    </div>
  );
}
