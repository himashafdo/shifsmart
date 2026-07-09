import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Network,
  CalendarCheck,
  PackageSearch,
  BarChart3,
  Building2,
  Bell,
  UserCog,
  Settings,
  Search,
  Mail,
  Calendar,
  ChevronDown,
  LogOut,
  AlertTriangle,
} from "lucide-react";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workers", label: "Workers", icon: Users },
  { to: "/shift-requests", label: "Shift Requests", icon: ClipboardList },
  { to: "/allocation", label: "Worker Allocation", icon: Network },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },

  { to: "/labour-shortage", label: "Labour Shortage", icon: AlertTriangle },
  { to: "/orders", label: "Order Progress", icon: PackageSearch },
  { to: "/reports", label: "Reports & Analytics", icon: BarChart3 },
  { to: "/agency", label: "Agency Portal", icon: Building2 },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: 12 },
  { to: "/users", label: "User Management", icon: UserCog },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Layout({ children }) {
  const { logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">SS</div>
          <div>
            <div className="brand-name">ShiftSmart</div>
            <div className="brand-sub">Workforce Optimisation System</div>
          </div>
        </div>

        <nav className="side-nav">
          {NAV.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                "side-link" + (isActive ? " active" : "")
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {badge && <span className="nav-badge">{badge}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="side-footer">
          <div className="company">
            <div className="company-logo">UC</div>
            <div className="company-text">
              <div>Union Colombo</div>
              <small>Industrial Washing (Pvt) Ltd</small>
            </div>
          </div>
          <div className="legend">
            <span>
              <i style={{ background: "#1e3a5f" }} /> Admin
            </span>
            <span>
              <i style={{ background: "#2e9e5b" }} /> HR Manager
            </span>
            <span>
              <i style={{ background: "#e6a23c" }} /> Supervisor
            </span>
            <span>
              <i style={{ background: "#e0524d" }} /> Agency User
            </span>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="search">
            <Search size={18} />
            <input placeholder="Search anything..." />
          </div>
          <div className="top-actions">
            <button className="icon-pill">
              <Bell size={18} />
              <span className="dot">12</span>
            </button>
            <button className="icon-pill">
              <Mail size={18} />
              <span className="dot blue">3</span>
            </button>
            <button className="icon-pill">
              <Calendar size={18} />
            </button>
            <div
              className="profile"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <div className="avatar">TP</div>
              <div className="profile-text">
                <div>Tharindu Perera</div>
                <small>Admin</small>
              </div>
              <ChevronDown size={16} />
            </div>
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <main className="content">{children}</main>

        <footer className="page-footer">
          © 2026 ShiftSmart Workforce Optimisation System &nbsp;|&nbsp; Union
          Colombo Industrial Washing (Pvt) Ltd. All rights reserved.
          <span>
            Version 1.0.0 &nbsp;·&nbsp; Privacy Policy &nbsp;·&nbsp; Terms of
            Use
          </span>
        </footer>
      </div>
    </div>
  );
}
