import { useNavigate } from "react-router-dom";
import AnnouncementImage from "../../../../Assets/IMG/AnnouncementImage.png";
import MentorImage from "../../../../Assets/IMG/MentorImage.jpg";
import BlueBookImage from "../../../../Assets/IMG/BlueBook.png";

export default function Mentors() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-screen-container">
      <div className="mentors-container">
        <div className="overview-jumbo courses-jumbo flex-row">
          <img src={AnnouncementImage} alt="" />
        </div>
        <div className="flex-row mentors-screen-row">
          <div className="mentors-screen-column flex-column">
            <span className="no-live-class-header">Mentors Profile</span>
            <div className="mentors-column flex-column">
              <div className="mentor-row flex-row">
                <img src={MentorImage} alt="" className="mentor-image" />
                <div className="mentor-row-right flex-column">
                  <div className="mentor-row-text">
                    <b>Theajstars (Hons, Mba, CCA, CNBA, CNN, APC, MTN)</b> is a
                    Fullstack Web & Mobile developer with over two years of
                    experience. In the daytime, he eats beans
                  </div>
                  <div className="mentor-row-buttons flex-row">
                    <button className="mentor-row-button-1">
                      Schedule Now
                    </button>
                    <button className="mentor-row-button-2">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="mentor-row flex-row">
                <img src={MentorImage} alt="" className="mentor-image" />
                <div className="mentor-row-right flex-column">
                  <div className="mentor-row-text">
                    <b>Theajstars (Hons, Mba, CCA, CNBA, CNN, APC, MTN)</b> is a
                    Fullstack Web & Mobile developer with over two years of
                    experience. In the daytime, he eats beans
                  </div>
                  <div className="mentor-row-buttons flex-row">
                    <button className="mentor-row-button-1">
                      Schedule Now
                    </button>
                    <button className="mentor-row-button-2">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="mentor-row flex-row">
                <img src={MentorImage} alt="" className="mentor-image" />
                <div className="mentor-row-right flex-column">
                  <div className="mentor-row-text">
                    <b>Theajstars (Hons, Mba, CCA, CNBA, CNN, APC, MTN)</b> is a
                    Fullstack Web & Mobile developer with over two years of
                    experience. In the daytime, he eats beans
                  </div>
                  <div className="mentor-row-buttons flex-row">
                    <button className="mentor-row-button-1">
                      Schedule Now
                    </button>
                    <button className="mentor-row-button-2">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mentors-screen-column flex-column">
            <span className="no-live-class-header available-sessions-header">
              Sessions available
            </span>
            <div className="flex-column mentor-screen-right">
              <div className="mentors-how-it-works">
                <div className="how-it-works-text">
                  <b>How it Works</b>
                </div>
                <br />
                <div className="how-it-works-text">
                  is a Fullstack Web & Mobile developer with over two years of
                  experience. In the daytime, he eats beans and plays Clash of
                  Clans. At night, he cries himself to sleep while writing
                  Javascript
                </div>
              </div>
              <div className="mentor-already-scheduled flex-row">
                <div className="mentor-already-scheduled-left flex-column">
                  <div className="how-it-works-text">
                    Already scheduled a Mentor?
                  </div>
                  <span className="no-live-class-header">
                    Register for a class
                  </span>
                  <button
                    onClick={() => {
                      navigate("/dashboard/courses");
                    }}
                    className="view-mentor-training-button"
                  >
                    View Training
                  </button>
                </div>
                <img
                  src={BlueBookImage}
                  alt=""
                  className="mentor-already-scheduled-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
