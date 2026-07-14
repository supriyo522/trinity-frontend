import { useEffect, useState } from "react";
import api from "../api/axios.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await api.get("/admin/dashboard");
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="page-loading">Loading dashboard...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">{stats.totalBookings}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Customers</div>
          <div className="stat-value">{stats.totalCustomers}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Hotels</div>
          <div className="stat-value">{stats.totalHotels}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Revenue (Paid)</div>
          <div className="stat-value">INR {stats.totalRevenue.toFixed(2)}</div>
        </div>
      </div>

      <h2>Recent Bookings</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ref</th>
            <th>Hotel</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stats.recentBookings.map((b) => (
            <tr key={b._id}>
              <td>{b.bookingRef}</td>
              <td>{b.hotel?.name}</td>
              <td>{b.customer?.firstName} {b.customer?.lastName}</td>
              <td><span className={`status-pill status-${b.bookingStatus}`}>{b.bookingStatus}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
