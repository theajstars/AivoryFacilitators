import { Grid, Modal } from "@mui/material";
import { useState } from "react";
import MentorImage from "../../../../Assets/IMG/MentorImage.jpg";
import BackgroundBlur from "../../../BackgroundBlur";

export default function Facilitators() {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = (value) => {
    // console.log(value);
    setModalOpen(value);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <div className="mentor-profile-modal-container flex-column">
          <div className="mentor-profile-modal-top flex-row">
            <img
              src={MentorImage}
              className="mentor-profile-modal-image"
              alt=""
            />
            <div className="mentor-profile-top-right flex-column">
              <span className="mentor-profile-modal-name">
                His Majesty (theajstars)
              </span>
              <span className="mentor-profile-modal-position">
                Senior Clash of Clans Player
              </span>
              <span className="mentor-profile-modal-tag">
                PhD. Covert Operations
              </span>
            </div>
          </div>
          <div className="mentor-profile-modal-summary">
            "Erioluwa is a User Interface Designer. He also leads a team of
            innovative individuals who ensure brands communicate their idea,
            vision and mission in form of designs. He is a designer, who not
            only works with clients but relate with them. He helps deliver
            solutions to brand design problems, with in-depth research,
            innovation and creativity. He also posses leadership traits, team
            spirit and a fast learner. He has also completed over 100 design
            works for different brands. He helps businesses as a graphic
            designer to attract their target audience and increase sales through
            the use of graphics. And as a Brand Identity Designer, He assist
            brands to translate their mission, purpose, and goals into the copy
            and visual aspects in a way that appeals to their target customers.
            <a href="#" className="mentor-profile-modal-link">
              <i>(Click here to view on LinkedIn)",</i>
            </a>
          </div>
          <BackgroundBlur open={isModalOpen} handleClose={handleModalClose} />
        </div>
      )}

      <div className="dashboard-screen-container flex-column">
        <div className="facilitators-container">
          <div className="overview-jumbo"></div>
          <div className="facilitators">
            <center>
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                alignContent="center"
              >
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="facilitator flex-row">
                    <img
                      src={MentorImage}
                      alt=""
                      className="facilitator-image"
                    />
                    <div className="facilitator-details flex-column">
                      <div className="facilitator-name">
                        Oluwaferanmi Ajiboye
                      </div>
                      <div className="facilitator-position">
                        Professional Clash of Clans Player
                      </div>
                      <button className="view-facilitator" onClick={openModal}>
                        View full profile
                      </button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="facilitator flex-row">
                    <img
                      src={MentorImage}
                      alt=""
                      className="facilitator-image"
                    />
                    <div className="facilitator-details flex-column">
                      <div className="facilitator-name">
                        Oluwaferanmi Ajiboye
                      </div>
                      <div className="facilitator-position">
                        Professional Clash of Clans Player
                      </div>
                      <button className="view-facilitator" onClick={openModal}>
                        View full profile
                      </button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="facilitator flex-row">
                    <img
                      src={MentorImage}
                      alt=""
                      className="facilitator-image"
                    />
                    <div className="facilitator-details flex-column">
                      <div className="facilitator-name">
                        Oluwaferanmi Ajiboye
                      </div>
                      <div className="facilitator-position">
                        Professional Clash of Clans Player
                      </div>
                      <button className="view-facilitator" onClick={openModal}>
                        View full profile
                      </button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="facilitator flex-row">
                    <img
                      src={MentorImage}
                      alt=""
                      className="facilitator-image"
                    />
                    <div className="facilitator-details flex-column">
                      <div className="facilitator-name">
                        Oluwaferanmi Ajiboye
                      </div>
                      <div className="facilitator-position">
                        Professional Clash of Clans Player
                      </div>
                      <button className="view-facilitator" onClick={openModal}>
                        View full profile
                      </button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="facilitator flex-row">
                    <img
                      src={MentorImage}
                      alt=""
                      className="facilitator-image"
                    />
                    <div className="facilitator-details flex-column">
                      <div className="facilitator-name">
                        Oluwaferanmi Ajiboye
                      </div>
                      <div className="facilitator-position">
                        Professional Clash of Clans Player
                      </div>
                      <button className="view-facilitator" onClick={openModal}>
                        View full profile
                      </button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="facilitator flex-row">
                    <img
                      src={MentorImage}
                      alt=""
                      className="facilitator-image"
                    />
                    <div className="facilitator-details flex-column">
                      <div className="facilitator-name">
                        Oluwaferanmi Ajiboye
                      </div>
                      <div className="facilitator-position">
                        Professional Clash of Clans Player
                      </div>
                      <button className="view-facilitator" onClick={openModal}>
                        View full profile
                      </button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}
