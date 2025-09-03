// apps/web/src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Suspense } from "react";

// pages
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import TasksPage from "./features/tasks/pages/TasksPage";
import NotesPage from "./features/notes/pages/NotesPage";
import MeetingsPage from "./features/meetings/pages/MeetingsPage";
import ExpensesPage from "./features/expenses/pages/ExpensesPage";

function DashboardHome() {
  return <div style={{ padding: 8, fontSize: 18 }}>Welcome to your Dashboard 🚀</div>;
}

export default function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  return (
    <Router>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <Routes>
          {/* Root: always redirect based on auth */}
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />

          {/* Public routes (auto-bounce if already logged in) */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
          />

          {/* Protected area */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/tasks" element={<TasksPage />} />
              <Route path="/dashboard/notes" element={<NotesPage />} />
              <Route path="/dashboard/meetings" element={<MeetingsPage />} />
              <Route path="/dashboard/expenses" element={<ExpensesPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
