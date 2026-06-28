import { Filter } from "lucide-react";
import { PageHead } from "../components/Bits";
import { ALLOCATIONS } from "../data";

export default function Allocation() {
  return (
    <div className="page">
      <PageHead title="Worker Allocation" action={<button className="btn-ghost"><Filter size={15} /> Filter</button>} />
      <div className="card">
        <div className="filter-row">
          <label className="inline-field">Shift
            <select><option>Day Shift (12 May 2026)</option><option>Night Shift (12 May 2026)</option></select>
          </label>
          <label className="inline-field">View
            <select><option>All Allocations</option><option>Allocated</option><option>Pending</option></select>
          </label>
        </div>
        <table className="data-table">
          <thead><tr><th>Worker ID</th><th>Name</th><th>Skills</th><th>Assigned Role</th><th>Status</th></tr></thead>
          <tbody>
            {ALLOCATIONS.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td><td>{a.name}</td><td>{a.skills}</td><td>{a.role}</td>
                <td><span className={"pill " + (a.status === "Allocated" ? "active" : "pending")}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-foot-right"><button className="btn-primary">Save Allocation</button></div>
      </div>
    </div>
  );
}
