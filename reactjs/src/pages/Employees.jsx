import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import "../styles/Management.css";

const Employees = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    department: "",
    position: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getEmployees(token);
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("401")) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.updateEmployee(token, editingId, formData);
      } else {
        await apiClient.createEmployee(token, formData);
      }
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        position: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
    });
    setEditingId(employee.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await apiClient.deleteEmployee(token, id);
        fetchEmployees();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="management-container">
      <nav className="management-navbar">
        <div className="navbar-brand">
          <h2>📊 Task Management</h2>
        </div>
        <div className="navbar-menu">
          <a href="/dashboard">Dashboard</a>
          <a href="/employees" className="active">
            Employees
          </a>
          <a href="/tasks">Tasks</a>
        </div>
        <div className="navbar-user">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="management-content">
        <div className="management-header">
          <h1>👥 Employees</h1>
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                first_name: "",
                last_name: "",
                email: "",
                department: "",
                position: "",
              });
            }}
          >
            {showForm ? "Cancel" : "+ Add Employee"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <form className="management-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">
              {editingId ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="loading">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found. Create your first employee!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="management-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{`${employee.first_name} ${employee.last_name}`}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department || "-"}</td>
                    <td>{employee.position || "-"}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(employee)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(employee.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
