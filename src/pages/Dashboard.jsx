import { Link } from "react-router-dom";
import {
  Users,
  FileCheck,
  ShoppingBag,
  CheckCircle2,
  UserX,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Plus,
  UserPlus,
  ListOrdered,
  FileBarChart,
} from "lucide-react";
import { Donut, LineChart, BarPairs } from "../components/Charts";
import {
  KPIS,
  ATTENDANCE_BREAKDOWN,
  ORDER_BREAKDOWN,
  DELIVERY_TREND,
  ORDERS,
  ORDERS_AT_RISK,
  KPI_LIST,
  UPCOMING_SHIFTS,
  LABOUR_VS_DEMAND,
  NOTIFICATIONS,
} from "../data";
import { useApp } from "../context/AppContext";
const statusClass = (s) => "pill " + s.toLowerCase().replace(/\s/g, "-");
const riskClass = (r) => "risk " + r.toLowerCase();

export default function Dashboard() {
  const { labourShortage } = useApp();
  const liveLabourVsDemand = [
    {
      shift: labourShortage.shift,
      needed: Number(labourShortage.totalRequired),
      present: Number(labourShortage.totalConfirmed),
    },
  ];
  return (
    <div className="page">
      {/* KPI cards */}
      <div className="kpi-row">
        <KpiCard
          icon={Users}
          tint="blue"
          label="Workers Present Today"
          value="96"
          sub="of 108 Requested"
          trend="88.9%"
        />
        <KpiCard
          icon={FileCheck}
          tint="green"
          label="On-Time Delivery Rate"
          value="92%"
          sub="Target: 90%"
        />
        <KpiCard
          icon={ShoppingBag}
          tint="purple"
          label="Orders In Progress"
          value="18"
          sub="5 At Risk"
        />
        <KpiCard
          icon={CheckCircle2}
          tint="sky"
          label="Orders Completed Today"
          value="12"
          sub="This Week: 65"
        />
        <KpiCard
          icon={UserX}
          tint="red"
          label="No-Show Rate Today"
          value="12%"
          sub="Target: < 15%"
        />
      </div>

      {/* Charts row */}
      <div className="grid-3">
        <Card title="Workforce Overview (Today)">
          <div className="donut-block">
            <Donut
              data={ATTENDANCE_BREAKDOWN}
              centerValue="108"
              centerLabel="Requested"
            />
            <Legend data={ATTENDANCE_BREAKDOWN} />
          </div>
        </Card>
        <Card title="Order Progress Summary">
          <div className="donut-block">
            <Donut
              data={ORDER_BREAKDOWN}
              centerValue="18"
              centerLabel="Total Orders"
            />
            <Legend data={ORDER_BREAKDOWN} />
          </div>
        </Card>
        <Card title="On-Time Delivery Trend" action="This Week">
          <LineChart data={DELIVERY_TREND} />
        </Card>
      </div>

      {/* Order progress + at risk + KPIs */}
      <div className="grid-orders">
        <Card
          title="Order Progress"
          action={
            <Link to="/orders" className="link-btn">
              View All Orders
            </Link>
          }
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Due Date</th>
                <th>Progress</th>
                <th>Current Stage</th>
                <th>Status</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.due}</td>
                  <td>
                    <div className="progress">
                      <div style={{ width: o.progress + "%" }} />
                    </div>
                    <small>{o.progress}%</small>
                  </td>
                  <td>{o.stage}</td>
                  <td>
                    <span className={statusClass(o.status)}>{o.status}</span>
                  </td>
                  <td>
                    {o.risk === "-" ? (
                      "–"
                    ) : (
                      <span className={riskClass(o.risk)}>{o.risk}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card
          title="Orders At Risk"
          action={
            <Link to="/orders" className="link-light">
              View All
            </Link>
          }
        >
          {ORDERS_AT_RISK.map((o) => (
            <div className="risk-item" key={o.id}>
              <div>
                <strong>{o.id}</strong> · {o.customer}
                <div className="risk-due">Due: {o.due}</div>
                <div className="risk-reason">Reason: {o.reason}</div>
              </div>
              <span className={riskClass(o.level)}>{o.level}</span>
            </div>
          ))}
        </Card>

        <Card title="Key Performance Indicators">
          {KPI_LIST.map((k, i) => (
            <div className="kpi-line" key={i}>
              <span>
                <TrendingUp size={15} /> {k.label}
              </span>
              <strong>{k.value}</strong>
            </div>
          ))}
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid-4">
        <Card
          title="Upcoming Shifts"
          action={
            <Link to="/shift-requests" className="link-light">
              View All
            </Link>
          }
        >
          <table className="data-table compact">
            <thead>
              <tr>
                <th>Shift</th>
                <th>Date</th>
                <th>Req</th>
                <th>Conf</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {UPCOMING_SHIFTS.map((s, i) => (
                <tr key={i}>
                  <td>{s.shift}</td>
                  <td>{s.date}</td>
                  <td>{s.requested}</td>
                  <td>{s.confirmed ?? "–"}</td>
                  <td>
                    <span className={statusClass(s.status)}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Labour vs Demand (Today)">
          <BarPairs data={liveLabourVsDemand} />
          <div className="bar-legend">
            <span>
              <i style={{ background: "#3b6ca8" }} /> Workers Needed
            </span>
            <span>
              <i style={{ background: "#2e9e5b" }} /> Workers Present
            </span>
          </div>
        </Card>

        <Card
          title="Recent Notifications"
          action={
            <Link to="/notifications" className="link-light">
              View All
            </Link>
          }
        >
          {NOTIFICATIONS.map((n, i) => {
            const Ico =
              n.icon === "shift"
                ? Clock
                : n.icon === "check"
                  ? CheckCircle
                  : n.icon === "risk"
                    ? AlertCircle
                    : FileText;
            return (
              <div className="notif" key={i}>
                <Ico size={16} className={"notif-ico " + n.icon} />
                <div>
                  <div>{n.text}</div>
                  <small>{n.time}</small>
                </div>
              </div>
            );
          })}
        </Card>

        <Card title="Quick Actions">
          <Link to="/shift-requests" className="qa blue">
            <Plus size={16} /> New Shift Request
          </Link>
          <Link to="/workers" className="qa green">
            <UserPlus size={16} /> Register New Worker
          </Link>
          <Link to="/orders" className="qa purple">
            <ListOrdered size={16} /> View All Orders
          </Link>
          <Link to="/reports" className="qa orange">
            <FileBarChart size={16} /> Generate Report
          </Link>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, tint, label, value, sub, trend }) {
  return (
    <div className="kpi-card">
      <div className={"kpi-icon " + tint}>
        <Icon size={22} />
      </div>
      <div className="kpi-body">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">
          {value} {trend && <span className="kpi-trend">{trend}</span>}
        </div>
        <div className="kpi-sub">{sub}</div>
      </div>
    </div>
  );
}

function Card({ title, action, children }) {
  return (
    <div className="card">
      <div className="card-head">
        <h3>{title}</h3>
        {action && <div className="card-action">{action}</div>}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function Legend({ data }) {
  return (
    <div className="legend-list">
      {data.map((d) => (
        <div key={d.label}>
          <span className="dot-sm" style={{ background: d.color }} />
          {d.label}{" "}
          <strong>
            {d.value} ({d.pct}%)
          </strong>
        </div>
      ))}
    </div>
  );
}
