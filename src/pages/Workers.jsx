import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, Eye, Pencil, Trash2, X } from "lucide-react";
import { PageHead } from "../components/Bits";

export default function Workers() {
  const { workers, addWorker, deleteWorker } = useApp();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ name: "", age: "", skills: "", experience: "", status: "Active" });

  const filtered = workers.filter((w) =>
    w.name.toLowerCase().includes(q.toLowerCase()) || w.skills.toLowerCase().includes(q.toLowerCase()));

  const save = () => {
    if (!form.name) return alert("Enter a name");
    addWorker(form);
    setForm({ name: "", age: "", skills: "", experience: "", status: "Active" });
    setOpen(false);
  };

  return (
    <div className="page">
      <PageHead title="Workers" action={
        <button className="btn-primary" onClick={() => setOpen(true)}><Plus size={16} /> Add New Worker</button>} />

      <div className="card">
        <div className="filter-row">
          <input className="search-input" placeholder="Search workers..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select><option>All Skills</option></select>
          <select><option>All Status</option></select>
        </div>
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Skills</th><th>Experience</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td><td>{w.name}</td><td>{w.age}</td><td>{w.skills}</td><td>{w.experience}</td>
                <td><span className={"pill " + (w.status === "Active" ? "active" : "inactive")}>{w.status}</span></td>
                <td className="row-actions">
                  <button className="ico"><Eye size={15} /></button>
                  <button className="ico"><Pencil size={15} /></button>
                  <button className="ico red" onClick={() => deleteWorker(w.id)}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head"><h3>Register New Worker</h3><button onClick={() => setOpen(false)}><X size={18} /></button></div>
            <div className="modal-grid">
              <label>Full Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" /></label>
              <label>Age<input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" /></label>
              <label>Skills<input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="e.g. Sorting, Washing" /></label>
              <label>Experience<input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 2 Years" /></label>
              <label>Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </label>
            </div>
            <div className="modal-foot">
              <button className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={save}>Save Worker</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
