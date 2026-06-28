import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHead } from "../components/Bits";
import { USERS } from "../data";

export default function UserManagement() {
  return (
    <div className="page">
      <PageHead title="User Management" action={<button className="btn-primary"><Plus size={16} /> Add User</button>} />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>User ID</th><th>Name</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.role}</td>
                <td><span className="pill active">{u.status}</span></td>
                <td className="row-actions">
                  <button className="ico"><Pencil size={15} /></button>
                  <button className="ico red"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
