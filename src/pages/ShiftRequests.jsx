import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, X } from "lucide-react";
import { PageHead } from "../components/Bits";

const SKILLS = ["Sorting", "Washing", "Packing", "Drying", "Ironing"];

export default function ShiftRequests() {
  const { shiftRequests, addShiftRequest } = useApp();
  const [type, setType] = useState("Day Shift");
  const [date, setDate] = useState("12/05/2026");
  const [time, setTime] = useState("06:00 AM - 06:00 PM");
  const [count, setCount] = useState("120");
  const [skills, setSkills] = useState(["Sorting", "Washing", "Packing"]);
  const [notes, setNotes] = useState("");

  const toggle = (s) => setSkills((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const send = () => {
    addShiftRequest({ type, date, time, count, skills: skills.join(", "), notes });
    alert("Shift request sent!");
    setNotes("");
  };

  return (
    <div className="page">
      <PageHead title="Shift Requests" action={<button className="btn-primary"><Plus size={16} /> New Request</button>} />

      <div className="grid-request">
        <div className="card">
          <div className="card-head"><h3>Create Request</h3></div>
          <div className="card-body">
            <div className="form-2">
              <label>Shift Type
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option>Day Shift</option><option>Night Shift</option>
                </select>
              </label>
              <label>Date<input value={date} onChange={(e) => setDate(e.target.value)} /></label>
              <label>Required Time<input value={time} onChange={(e) => setTime(e.target.value)} /></label>
              <label>Number of Workers<input value={count} onChange={(e) => setCount(e.target.value)} /></label>
            </div>

            <p className="field-label">Required Skills</p>
            <div className="chips">
              {SKILLS.map((s) => (
                <button key={s} className={"chip" + (skills.includes(s) ? " on" : "")} onClick={() => toggle(s)}>
                  {s} {skills.includes(s) && <X size={12} />}
                </button>
              ))}
            </div>

            <label>Additional Notes
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter any additional notes..." />
            </label>

            <div className="modal-foot">
              <button className="btn-ghost" onClick={() => setNotes("")}>Cancel</button>
              <button className="btn-primary" onClick={send}>Send Request</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Request Summary</h3></div>
          <div className="card-body summary">
            <Row k="Shift Type" v={type} />
            <Row k="Date" v={date} />
            <Row k="Time" v={time} />
            <Row k="Number of Workers" v={count} />
            <Row k="Skills Required" v={skills.join(", ")} />
          </div>
        </div>
      </div>

      {shiftRequests.length > 0 && (
        <div className="card">
          <div className="card-head"><h3>Submitted Requests</h3></div>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Shift</th><th>Date</th><th>Workers</th><th>Skills</th><th>Status</th></tr></thead>
            <tbody>
              {shiftRequests.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td><td>{r.type}</td><td>{r.date}</td><td>{r.count}</td><td>{r.skills}</td>
                  <td><span className="pill pending">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const Row = ({ k, v }) => <div className="sum-row"><span>{k}</span><strong>{v}</strong></div>;
