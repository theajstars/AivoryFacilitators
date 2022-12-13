import ProfileAvatar from "../../../Assets/IMG/StudentAvatar.svg";

import DashboardDate from "./DashboardComponents/DashboardDate";
import DashboardUpcomingEvents from "./DashboardComponents/DashboardUpcomingEvents";

export default function DashboardRightNav() {
  return (
    <>
      <div className="dashboard-right-nav-container flex-column">
        <div className="dashboard-right-nav flex-column">
          <DashboardDate />
          <DashboardUpcomingEvents />
        </div>
      </div>
    </>
  );
}
