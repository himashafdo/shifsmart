import { FileBarChart, TrendingUp, UserX, Truck, Users } from "lucide-react";
import { PageHead } from "../components/Bits";
import { LineChart } from "../components/Charts";
import { ATTENDANCE_TREND, TOP_WORKERS } from "../data";

export default function Reports() {
  return (
    <div className="page">
      <PageHead title="Reports & Analytics" />
      <div className="card">
        <div className="filter-row">
          <label className="inline-field">Report Type<select><option>Attendance Report</option><option>Order Report</option></select></label>
          <label className="inline-field">From Date<input defaultValue="01/05/2026" /></label>
          <label className="inline-field">To Date<input defaultValue="12/05/2026" /></label>
          <button className="btn-primary"><FileBarChart size={15} /> Generate Report</button>
        </div>

        <div className="mini-stats">
          <Mini icon={Users} label="Average Attendance" value="88%" tint="green" />
          <Mini icon={UserX} label="No-Show Rate" value="12%" tint="red" />
          <Mini icon={Truck} label="On-Time Delivery" value="92%" tint="blue" />
          <Mini icon={TrendingUp} label="Total Workers" value="108" tint="purple" />
        </div>

        <div className="report-grid">
          <div>
            <h3 className="block-title">Attendance Trend</h3>
            <LineChart data={ATTENDANCE_TREND} />
          </div>
          <div>
            <h3 className="block-title">Top Reliable Workers</h3>
            <ol className="rank-list">
              {TOP_WORKERS.map((w, i) => (
                <li key={w.name}><span>{i + 1}. {w.name}</span><strong>★ {w.rating}%</strong></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mini({ icon: Icon, label, value, tint }) {
  return (
    <div className="mini">
      <div className={"mini-ico " + tint}><Icon size={18} /></div>
      <div><div className="mini-val">{value}</div><div className="mini-label">{label}</div></div>
    </div>
  );
}
