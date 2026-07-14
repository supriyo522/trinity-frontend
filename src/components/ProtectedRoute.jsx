import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { adminInfo } = useAuth();
  if (!adminInfo) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;
