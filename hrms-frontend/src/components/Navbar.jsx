import { Users, CalendarCheck } from "lucide-react";
import { useState } from "react";
import Attendance from "../pages/AttendanceForm";
import "./Navbar.css";

export default function Navbar() {
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-title">HRMS</h1>
          <span className="navbar-subtitle">
            Human Resource Management System
          </span>
        </div>

        <div className="navbar-links">
          
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setShowAttendanceModal(true);
            }}
          >
            <CalendarCheck size={16} /> Attendance
          </a>
        </div>
      </nav>

      {showAttendanceModal && (
        <div className="modal-overlay" onClick={() => setShowAttendanceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowAttendanceModal(false)}
            >
              ✕
            </button>
            <Attendance closeModal={() => setShowAttendanceModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
