import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, Eye, Pencil, Trash2, X } from "lucide-react";
import { PageHead } from "../components/Bits";

const EMPTY = {
  name: "",
  nic: "",
  age: "",
  skills: "",
  experience: "",
  status: "Active",
};

export default function Workers() {
  const { workers, addWorker, deleteWorker, updateWorker } = useApp();
  const [open, setOpen] = useState(false); // add/edit modal
  const [viewing, setViewing] = useState(null); // view modal
  const [editingId, setEditingId] = useState(null); // null = adding, else editing this id
  const [q, setQ] = useState("");
  const [form, setForm] = useState(EMPTY);

  const filtered = workers.filter(
    (w) =>
      w.name.toLowerCase().includes(q.toLowerCase()) ||
      w.skills.toLowerCase().includes(q.toLowerCase()),
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (w) => {
    setEditingId(w.id);
    setForm({
      name: w.name,
      nic: w.nic || "",
      age: w.age,
      skills: w.skills,
      experience: w.experience,
      status: w.status,
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.name) return alert("Enter a name");
    if (!form.nic) return alert("Enter a National ID");
    if (editingId) {
      updateWorker(editingId, form);
    } else {
      addWorker(form);
    }
    setForm(EMPTY);
    setEditingId(null);
    setOpen(false);
  };

  const remove = (id) => {
    if (confirm("Remove this worker?")) deleteWorker(id);
  };

  return (
    <div className="page">
      <PageHead
        title="Workers"
        action={
          <button className="btn-primary" onClick={openAdd}>
            <Plus size={16} /> Add New Worker
          </button>
        }
      />

      <div className="card">
        <div className="filter-row">
          <input
            className="search-input"
            placeholder="Search workers..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select>
            <option>All Skills</option>
          </select>
          <select>
            <option>All Status</option>
          </select>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Age</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>{w.nic || "—"}</td>
                <td>{w.age}</td>
                <td>{w.skills}</td>
                <td>{w.experience}</td>
                <td>
                  <span
                    className={
                      "pill " + (w.status === "Active" ? "active" : "inactive")
                    }
                  >
                    {w.status}
                  </span>
                </td>
                <td className="row-actions">
                  <button className="ico" onClick={() => setViewing(w)}>
                    <Eye size={15} />
                  </button>
                  <button className="ico" onClick={() => openEdit(w)}>
                    <Pencil size={15} />
                  </button>
                  <button className="ico red" onClick={() => remove(w.id)}>
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit modal */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{editingId ? "Edit Worker" : "Register New Worker"}</h3>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-grid">
              <label>
                Full Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </label>
              <label>
                National ID
                <input
                  value={form.nic}
                  onChange={(e) => setForm({ ...form, nic: e.target.value })}
                  placeholder="e.g. 200012345678"
                />
              </label>
              <label>
                Age
                <input
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="Age"
                />
              </label>
              <label>
                Skills
                <input
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="e.g. Sorting, Washing"
                />
              </label>
              <label>
                Experience
                <input
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  placeholder="e.g. 2 Years"
                />
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>
            </div>
            <div className="modal-foot">
              <button className="btn-ghost" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={save}>
                {editingId ? "Save Changes" : "Save Worker"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View modal */}
      {viewing && (
        <div className="modal-overlay" onClick={() => setViewing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Worker Details</h3>
              <button onClick={() => setViewing(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-grid">
              <ViewRow label="Worker ID" value={viewing.id} />
              <ViewRow label="Full Name" value={viewing.name} />
              <ViewRow label="National ID" value={viewing.nic || "—"} />
              <ViewRow label="Age" value={viewing.age} />
              <ViewRow label="Skills" value={viewing.skills} />
              <ViewRow label="Experience" value={viewing.experience} />
              <ViewRow label="Status" value={viewing.status} />
            </div>
            <div className="modal-foot">
              <button className="btn-ghost" onClick={() => setViewing(null)}>
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  openEdit(viewing);
                  setViewing(null);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ViewRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: ".76rem", color: "#6b7a90", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: ".9rem", fontWeight: 600 }}>{value}</div>
    </div>
  );
}
