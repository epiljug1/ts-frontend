import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

export function RequireAuth({ children }) {
  const authed = useAuth();
  const location = useLocation();

  if (authed.isLoading) {
    return <Spinner />;
  }

  return authed.isAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
}
