import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLayout = () => {
  const { adminInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">Trinity Suites</div>
        <nav>
          <NavLink to="/admin/dashboard" className="admin-nav-link">Dashboard</NavLink>
          <NavLink to="/admin/bookings" className="admin-nav-link">Bookings</NavLink>
          <NavLink to="/admin/customers" className="admin-nav-link">Customers</NavLink>
        </nav>
        <div className="admin-user">
          <div>{adminInfo?.name}</div>
          <button onClick={handleLogout} className="btn-link">Logout</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
