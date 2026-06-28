import { useState } from "react";
import { QrCode, ScanLine } from "lucide-react";
import { PageHead } from "../components/Bits";

export default function Attendance() {
  const [tab, setTab] = useState("Check-in");
  const [wid, setWid] = useState("");

  return (
    <div className="page">
      <PageHead title="Attendance" />
      <div className="card">
        <div className="tabs">
          {["Check-in", "Check-out", "Attendance Records"].map((t) => (
            <button key={t} className={"tab" + (tab === t ? " on" : "")} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <div className="attend-grid">
          <div className="scan-box">
            <ScanLine size={40} />
            <h3>Scan Worker QR Code / ID</h3>
            <p>Scan the QR code or enter Worker ID to check-in</p>
            <button className="btn-primary full"><QrCode size={16} /> Scan QR Code</button>
            <div className="or">OR</div>
            <input placeholder="Enter Worker ID" value={wid} onChange={(e) => setWid(e.target.value)} />
            <button className="btn-primary full" onClick={() => { if (wid) { alert(`${tab}: ${wid} recorded`); setWid(""); } }}>
              {tab}
            </button>
          </div>

          <div className="summary-box">
            <h3>Today's Summary</h3>
            <div className="sum-line"><span>Total Workers</span><strong>108</strong></div>
            <div className="sum-line"><span>Present</span><strong className="green">96</strong></div>
            <div className="sum-line"><span>Absent</span><strong className="red">12</strong></div>
            <div className="sum-line"><span>Late</span><strong className="amber">12</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
