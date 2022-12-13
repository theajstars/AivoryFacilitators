import TrainingsEnrolledIcon from "../../../../../Assets/IMG/Overview/TrainingsEnrolledIcon.svg";
import TrainingsCompletedIcon from "../../../../../Assets/IMG/Overview/TrainingsCompletedIcon.svg";
import TrainingsProgressIcon from "../../../../../Assets/IMG/Overview/TrainingsInProgressIcon.svg";

export default function TrainingsOverview() {
  return (
    <div className="trainings-overview flex-row">
      <div className="training-overview flex-column">
        <div className="training-overview-head flex-row">
          <img
            src={TrainingsEnrolledIcon}
            alt=""
            className="training-overview-icon"
          />
          <span className="dashboard-text-normal">Trainings Enrolled</span>
        </div>
        <span className="training-overview-value">02</span>
      </div>
      <div className="training-overview flex-column">
        <div className="training-overview-head flex-row">
          <img
            src={TrainingsProgressIcon}
            alt=""
            className="training-overview-icon"
          />
          <span className="dashboard-text-normal">Trainings in Progress</span>
        </div>
        <span className="training-overview-value">04</span>
      </div>
      <div className="training-overview flex-column">
        <div className="training-overview-head flex-row">
          <img
            src={TrainingsCompletedIcon}
            alt=""
            className="training-overview-icon"
          />
          <span className="dashboard-text-normal">Trainings Enrolled</span>
        </div>
        <span className="training-overview-value">09</span>
      </div>
    </div>
  );
}
