import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppsContext } from "../AppsContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AppsContext);
  const location = useLocation();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Otherwise, allow access
  return children;
}
