import { useState, useEffect } from "react";

import axios from "axios";
import { baseURL } from "../../../../App";

export default function DashboardUpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/events/getAll`).then((res) => {
      const { auth, events } = res.data;
      console.log(events);
      if (auth) {
        setEvents(events);
      }
    });
  }, []);
  return (
    <div className="dashboard-upcoming-events-container flex-column">
      <span className="course-overview-card-title dashboard-upcoming-events-head">
        Upcoming events
      </span>
      <div className="dashboard-upcoming-events flex-column">
        {events.map((event) => {
          function getFullDate(date) {
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            const d = new Date(parseInt(date));
            console.log(d);
            let eventDate = d.getDate();
            let eventMonth = months[d.getMonth()];
            let eventYear = d.getFullYear();

            // return `${eventDate} ${eventMonth} ${eventYear}`;
            return {
              eventDate,
              eventMonth,
            };
          }
          return (
            <>
              {!event.eventCompleted && (
                <div className="dashboard-upcoming-event flex-row">
                  <div className="dashboard-upcoming-event-date flex-column">
                    <span className="dashboard-upcoming-event-month">
                      {getFullDate(parseInt(event.eventDate)).eventMonth}
                    </span>
                    <span className="dashboard-upcoming-event-day">
                      {getFullDate(parseInt(event.eventDate)).eventDate}
                    </span>
                  </div>
                  <div className="dashboard-upcoming-event-details flex-column">
                    <span className="dashboard-upcoming-event-title">
                      {event.eventTitle.length > 20
                        ? `${event.eventTitle.substring(0, 20)}...`
                        : event.eventTitle}
                    </span>
                    <span className="dashboard-upcoming-event-body">
                      {event.eventDescription.length > 40
                        ? `${event.eventDescription.substring(0, 40)}...`
                        : event.eventDescription}
                    </span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
