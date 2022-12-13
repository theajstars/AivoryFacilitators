import { useState } from "react";
import { Grid } from "@mui/material";
import Calendar from "react-calendar";

export default function DashboardDate() {
  const [date, setDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="dashboard-date-container flex-column">
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );
}
