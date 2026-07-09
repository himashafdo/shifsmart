import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import ShiftRequests from "./pages/ShiftRequests";
import Allocation from "./pages/Allocation";
import Attendance from "./pages/Attendance";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Agency from "./pages/Agency";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import LabourShortage from "./pages/LabourShortage";

function Protected({ children }) {
  const { isAuthed } = useApp();
  if (!isAuthed) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/workers"
        element={
          <Protected>
            <Workers />
          </Protected>
        }
      />
      <Route
        path="/shift-requests"
        element={
          <Protected>
            <ShiftRequests />
          </Protected>
        }
      />
      <Route
        path="/allocation"
        element={
          <Protected>
            <Allocation />
          </Protected>
        }
      />
      <Route
        path="/attendance"
        element={
          <Protected>
            <Attendance />
          </Protected>
        }
      />
      <Route
        path="/labour-shortage"
        element={
          <Protected>
            <LabourShortage />
          </Protected>
        }
      />
      <Route
        path="/orders"
        element={
          <Protected>
            <Orders />
          </Protected>
        }
      />
      <Route
        path="/reports"
        element={
          <Protected>
            <Reports />
          </Protected>
        }
      />
      <Route
        path="/agency"
        element={
          <Protected>
            <Agency />
          </Protected>
        }
      />
      <Route
        path="/notifications"
        element={
          <Protected>
            <Notifications />
          </Protected>
        }
      />
      <Route
        path="/users"
        element={
          <Protected>
            <UserManagement />
          </Protected>
        }
      />
      <Route
        path="/settings"
        element={
          <Protected>
            <Settings />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
