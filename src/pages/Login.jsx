import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ADMIN } from "../data";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const submit = () => {
    if (u === ADMIN.username && p === ADMIN.password) {
      login();
      navigate("/dashboard");
    } else setErr("Invalid credentials. Use admin / shift123");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">SS</div>
          <div>
            <div className="login-brand-name">ShiftSmart</div>
            <div className="login-brand-sub">Workforce Optimisation System</div>
          </div>
        </div>
        <div className="login-tagline">
          <h1>
            Efficient Workforce.
            <br />
            Reliable Shifts.
            <br />
            On-Time Delivery.
          </h1>
          <div className="login-company">
            <div className="login-company-logo">UC</div>
            <div>
              Union Colombo
              <br />
              <small>Industrial Washing (Pvt) Ltd</small>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p className="login-sub">Sign in to continue</p>

          <label>
            Username
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="Enter your username"
            />
          </label>

          <label>
            Password
            <div className="pw-field">
              <input
                type={show ? "text" : "password"}
                value={p}
                onChange={(e) => setP(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <div className="forgot">Forgot Password?</div>
          {err && <p className="login-err">{err}</p>}

          <button className="login-btn" onClick={submit}>
            Login
          </button>
          <p className="login-foot">
            Don't have an account? <span>Contact Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
