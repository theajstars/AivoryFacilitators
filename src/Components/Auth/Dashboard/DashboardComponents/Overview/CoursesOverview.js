import CourseOverviewIcon from "../../../../../Assets/IMG/Overview/CourseOverviewOne.svg";

export default function CoursesOverview() {
  return (
    <div>
      <span className="dashboard-top-nav-header">Courses</span>
      <br />
      <br />
      <div className="courses-overview-container flex-row">
        <div className="course-overview-card flex-column">
          <div className="course-overview-card-top flex-row">
            <img
              src={CourseOverviewIcon}
              alt=""
              className="course-overview-avatar"
            />
            <div className="course-overview-card-details flex-column">
              <span className="course-overview-card-price">$2000USD</span>
              <span className="course-overview-card-title">
                Business Analysis and Scrum Master
              </span>
            </div>
          </div>
          <button className="course-overview-button course-overview-enroll">
            Enroll Now
          </button>
        </div>
        <div className="course-overview-card flex-column">
          <div className="course-overview-card-top flex-row">
            <img
              src={CourseOverviewIcon}
              alt=""
              className="course-overview-avatar"
            />
            <div className="course-overview-card-details flex-column">
              <span className="course-overview-card-price">$2000USD</span>
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

        <div className="course-overview-card flex-column">
          <div className="course-overview-card-top flex-row">
            <img
              src={CourseOverviewIcon}
              alt=""
              className="course-overview-avatar"
            />
            <div className="course-overview-card-details flex-column">
              <span className="course-overview-card-price">$2000USD</span>
              <span className="course-overview-card-title">Scrum Master</span>
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
      </div>
    </div>
  );
}
