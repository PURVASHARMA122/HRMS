import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { api } from "../api";

export default function AttendanceCalendar({ employee }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!employee) return;

    api.get(`/attendance/employee/${employee.id}`).then((res) => {
      const calendarEvents = res.data.map((a) => ({
        title: a.status,
        date: a.date,
        backgroundColor: a.status === "Present" ? "#22c55e" : "#ef4444",
        borderColor: a.status === "Present" ? "#22c55e" : "#ef4444",
        extendedProps: {
          check_in: a.check_in,
        },
      }));

      setEvents(calendarEvents);
    });
  }, [employee]);

  if (!employee) return null;

  return (
    <div className="calendar-wrapper">
      <h3 style={{ marginBottom: "10px" }}>
        {employee.full_name}'s Attendance
      </h3>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        displayEventTime={false}
        headerToolbar={{
    right: "prev,next",
    center: "title",
    left: "dayGridMonth",
  }}
      />
    </div>
  );
}
