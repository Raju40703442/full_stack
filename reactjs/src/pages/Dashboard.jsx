import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <h2>📊 Task Management</h2>
        </div>
        <div className="navbar-menu">
          <a href="/dashboard">Dashboard</a>
          <a href="/employees">Employees</a>
          <a href="/tasks">Tasks</a>
        </div>
        <div className="navbar-user">
          <span>{user?.username || user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, {user?.username || user?.email}! 👋</h1>
          <p>Manage your employees and tasks efficiently</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Employees</h3>
            <p>Manage your team members</p>
            <button
              onClick={() => navigate("/employees")}
              className="card-button"
            >
              View Employees
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">✅</div>
            <h3>Tasks</h3>
            <p>Organize and track tasks</p>
            <button
              onClick={() => navigate("/tasks")}
              className="card-button"
            >
              View Tasks
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📈</div>
            <h3>Analytics</h3>
            <p>View project statistics</p>
            <button className="card-button">Coming Soon</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your account</p>
            <button className="card-button">Coming Soon</button>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Employees</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active Tasks</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completed Tasks</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Pending Tasks</span>
              <span className="stat-value">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
