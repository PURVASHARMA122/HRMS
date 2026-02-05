import { useEffect, useState } from "react";
import { api } from "../api";
import "./AttendanceForm.css";

export default function Attendance({ closeModal }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const submitAttendance = async (e) => {
    e.preventDefault();
    setMessage("");

    await api.post("/attendance/", form);
    setMessage("Attendance marked successfully ✅");

    setTimeout(() => closeModal(), 1500);
  };

  return (
    <div className="attendance-container">
      <form onSubmit={submitAttendance} className="attendance-form">
        <h2 className="attendance-title">Mark Attendance</h2>

        {message && <p className="attendance-message">{message}</p>}

        <select
          className="attendance-input"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="attendance-input"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <select
          className="attendance-input"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button className="attendance-btn">Submit Attendance</button>
      </form>
    </div>
  );
}
