import { useState } from "react";
import { api } from "../api";
import toast, { Toaster } from "react-hot-toast";
import "./EmployeeForm.css";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/employees/", form);
      refresh();
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      toast.success("Employee added successfully!");
    } catch (err) {
      const data = err.response?.data;

      if (Array.isArray(data?.detail)) {
        data.detail.forEach((error) => {
          toast.error(`${error.loc[1] || "Field"}: ${error.msg}`);
        });
      } else if (typeof data?.detail === "string") {
        toast.error(data.detail);
      } else if (typeof data?.Detail === "string") {
        toast.error(data.Detail);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="employee-form">
        <h2 className="form-title">Add Employee</h2>

        <input
          placeholder="Employee ID"
          className="form-input"
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          required
        />

        <input
          placeholder="Full Name"
          className="form-input"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          className="form-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Department"
          className="form-input"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />

        <button className="submit-btn" type="submit">
          Add Employee
        </button>
      </form>

     
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
