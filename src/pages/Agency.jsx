import { CheckCircle, Eye } from "lucide-react";
import { PageHead } from "../components/Bits";
import { AGENCY_REQUESTS, NOTIFICATIONS } from "../data";

export default function Agency() {
  return (
    <div className="page">
      <PageHead title="Agency Portal" />
      <div className="grid-agency">
        <div className="card">
          <div className="card-head"><h3>Requests from UNICOL</h3></div>
          <table className="data-table">
            <thead><tr><th>Request ID</th><th>Shift</th><th>Date</th><th>Workers</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {AGENCY_REQUESTS.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td><td>{r.shift}</td><td>{r.date}</td><td>{r.workers}</td>
                  <td><span className={"pill " + (r.status === "Confirmed" ? "active" : "pending")}>{r.status}</span></td>
                  <td>
                    {r.status === "Confirmed"
                      ? <button className="ico"><Eye size={14} /> View</button>
                      : <button className="btn-green-sm"><CheckCircle size={13} /> View & Confirm</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><h3>Notifications</h3></div>
          <div className="card-body">
            {NOTIFICATIONS.map((n, i) => (
              <div className="notif" key={i}>
                <div className="notif-bullet" />
                <div><div>{n.text}</div><small>{n.time}</small></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
