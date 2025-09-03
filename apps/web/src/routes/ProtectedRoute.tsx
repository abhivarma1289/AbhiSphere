import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export default function ProtectedRoute() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
