import { PageHead } from "../components/Bits";

export default function Settings() {
  return (
    <div className="page">
      <PageHead title="Settings" />
      <div className="card">
        <div className="card-body">
          <div className="form-2">
            <label>System Name<input defaultValue="ShiftSmart Workforce Optimisation System" /></label>
            <label>Company<input defaultValue="Union Colombo Industrial Washing (Pvt) Ltd" /></label>
            <label>Default Shift Time<input defaultValue="06:00 AM - 06:00 PM" /></label>
            <label>No-Show Threshold<input defaultValue="15%" /></label>
            <label>Notifications<select><option>Enabled</option><option>Disabled</option></select></label>
            <label>Language<select><option>English</option><option>Sinhala</option><option>Tamil</option></select></label>
          </div>
          <div className="card-foot-right"><button className="btn-primary">Save Settings</button></div>
        </div>
      </div>
    </div>
  );
}
