import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Auth/Dashboard/Dashboard";
import Courses from "./Components/Auth/Dashboard/DashboardComponents/Courses";
import Facilitators from "./Components/Auth/Dashboard/DashboardComponents/Facilitators";
import Help from "./Components/Auth/Dashboard/DashboardComponents/Help";
import LiveClasses from "./Components/Auth/Dashboard/DashboardComponents/LiveClasses";
import Mentors from "./Components/Auth/Dashboard/DashboardComponents/Mentors";
import Overview from "./Components/Auth/Dashboard/DashboardComponents/Overview";
import Profile from "./Components/Auth/Dashboard/DashboardComponents/Profile";
import Settings from "./Components/Auth/Dashboard/DashboardComponents/Settings";
import Training from "./Components/Training";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index path="overview" element={<Overview />} />
        <Route path="help" element={<Help />} />
        <Route path="courses" element={<Courses />} />
        <Route path="live" element={<LiveClasses />} />
        <Route path="profile" element={<Profile />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="live" element={<LiveClasses />} />
        <Route path="facilitators" element={<Facilitators />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/training/:trainingID" element={<Training />} />
    </Routes>
  </Router>
);
