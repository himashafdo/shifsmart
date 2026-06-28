import { PageHead } from "../components/Bits";
import { ORDERS } from "../data";

const sc = (s) => "pill " + s.toLowerCase().replace(/\s/g, "-");
const rc = (r) => "risk " + r.toLowerCase();

export default function Orders() {
  return (
    <div className="page">
      <PageHead title="Order Progress" />
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Order ID</th><th>Customer</th><th>Due Date</th><th>Progress</th><th>Current Stage</th><th>Status</th><th>Risk</th></tr></thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.customer}</td><td>{o.due}</td>
                <td><div className="progress"><div style={{ width: o.progress + "%" }} /></div><small>{o.progress}%</small></td>
                <td>{o.stage}</td>
                <td><span className={sc(o.status)}>{o.status}</span></td>
                <td>{o.risk === "-" ? "–" : <span className={rc(o.risk)}>{o.risk}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
