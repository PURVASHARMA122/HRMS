import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import EmployeeForm from "../components/EmployeeForm";
import AttendanceCalendar from "../components/AttendanceCalnder";
import "./Employees.css";
import { Users } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };

  return (
    <div className="employees-container">
      <EmployeeForm refresh={fetchEmployees} />

      <div className="employees-list">
        <h2 className="employees-title">
          Employee List{" "}
          <Users size={20} style={{ marginRight: "8px", color: "#4f46e5" }} />
        </h2>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
          </div>
        ) : employees.length === 0 ? (
          <div className="no-employees">
            <Users
              size={48}
              style={{ color: "#a1a1aa", marginBottom: "10px" }}
            />
            <p style={{ color: "#a1a1aa", marginBottom: "10px" }}>No employees added yet.</p>
            
          </div>
        ) : (
          <ul className="employees-items">
            {employees.map((emp) => (
              <li key={emp.id} className="employee-card">
                <div>
                  <p className="employee-name">{emp.full_name}</p>
                  <p className="employee-meta">
                    {emp.department} • {emp.email}
                  </p>
                </div>

                <div className="employee-actions">
                  <button
                    className="view-btn"
                    onClick={() => setSelectedEmployee(emp)}
                  >
                    View Attendance
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setSelectedEmployee(null)}
            >
              ✕
            </button>

            <AttendanceCalendar employee={selectedEmployee} />
          </div>
        </div>
      )}
    </div>
  );
}
