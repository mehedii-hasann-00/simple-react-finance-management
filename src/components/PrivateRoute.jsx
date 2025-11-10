import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppsContext } from "../AppsContext";

export default function PrivateRoute({ children }) {
  const { user,loadingAuth } = useContext(AppsContext);
  const location = useLocation();

    if (loadingAuth) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Otherwise, allow access
  return children;
}

