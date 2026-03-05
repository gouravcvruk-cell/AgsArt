import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("auraart_admin_token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedAdminRoute;
