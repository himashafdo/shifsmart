import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { PageHead } from "../components/Bits";
import { Info } from "lucide-react";

export default function LabourShortage() {
  const { labourShortage, saveLabourShortage } = useApp();
  const [form, setForm] = useState(labourShortage);

  useEffect(() => setForm(labourShortage), [labourShortage]);

  const num = (v) => Number(v) || 0;

  const totalShortage = Math.max(
    num(form.totalRequired) - num(form.totalConfirmed),
    0,
  );
  const skilledShortage = Math.max(
    num(form.skilledRequired) - num(form.skilledConfirmed),
    0,
  );
  const semiShortage = Math.max(
    num(form.semiRequired) - num(form.semiConfirmed),
    0,
  );
  const unskilledShortage = Math.max(
    num(form.unskilledRequired) - num(form.unskilledConfirmed),
    0,
  );
  const shortagePct = num(form.totalRequired)
    ? ((totalShortage / num(form.totalRequired)) * 100).toFixed(1)
    : "0.0";

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = () => {
    saveLabourShortage(form);
    alert("Labour shortage saved — Dashboard chart updated.");
  };

  return (
    <div className="page">
      <PageHead title="Labour Shortage Calculation" />
      <p className="page-sub">
        Enter shift and demand details to calculate labour shortage.
      </p>

      <div className="card">
        <div className="card-head">
          <h3>1. Order &amp; Shift Information</h3>
        </div>
        <div className="card-body">
          <div className="form-3">
            <label>
              Order / Style
              <input
                value={form.orderStyle || "Denim Jacket - Export"}
                onChange={set("orderStyle")}
              />
            </label>
            <label>
              Shift
              <select value={form.shift} onChange={set("shift")}>
                <option>Day Shift</option>
                <option>Night Shift</option>
              </select>
            </label>
            <label>
              Shift Time
              <input
                value={form.shiftTime || "6:00 AM - 2:00 PM"}
                onChange={set("shiftTime")}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid-shortage">
        <div className="card">
          <div className="card-head">
            <h3>2. Enter Data to Calculate Labour Shortage</h3>
          </div>
          <div className="card-body shortage-cols">
            <div>
              <h4 className="col-title blue">
                A. Labour Demand (From System / Forecast)
              </h4>
              <label>
                Total Workers Required for this Shift *
                <input
                  type="number"
                  value={form.totalRequired}
                  onChange={set("totalRequired")}
                />
              </label>
              <label>
                Skilled Workers Required
                <input
                  type="number"
                  value={form.skilledRequired}
                  onChange={set("skilledRequired")}
                />
              </label>
              <label>
                Semi-skilled Workers Required
                <input
                  type="number"
                  value={form.semiRequired}
                  onChange={set("semiRequired")}
                />
              </label>
              <label>
                Unskilled Workers Required
                <input
                  type="number"
                  value={form.unskilledRequired}
                  onChange={set("unskilledRequired")}
                />
              </label>
              <div className="hint-box">
                <Info size={14} /> Demand is based on production workload,
                standard man-hours and productivity benchmarks.
              </div>
            </div>

            <div>
              <h4 className="col-title green">
                B. Labour Availability (Expected / Confirmed)
              </h4>
              <label>
                Workers Confirmed for this Shift *
                <input
                  type="number"
                  value={form.totalConfirmed}
                  onChange={set("totalConfirmed")}
                />
              </label>
              <label>
                Confirmed Skilled Workers
                <input
                  type="number"
                  value={form.skilledConfirmed}
                  onChange={set("skilledConfirmed")}
                />
              </label>
              <label>
                Confirmed Semi-skilled Workers
                <input
                  type="number"
                  value={form.semiConfirmed}
                  onChange={set("semiConfirmed")}
                />
              </label>
              <label>
                Confirmed Unskilled Workers
                <input
                  type="number"
                  value={form.unskilledConfirmed}
                  onChange={set("unskilledConfirmed")}
                />
              </label>
              <div className="hint-box">
                <Info size={14} /> Confirmed workers are those who accepted /
                confirmed the shift.
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>3. Shortage Summary (Calculated)</h3>
          </div>
          <div className="card-body shortage-summary">
            <div className="shortage-stat">
              <span>Total Labour Shortage</span>
              <strong>{totalShortage} workers</strong>
            </div>
            <div className="shortage-stat">
              <span>Skilled Workers Shortage</span>
              <strong>{skilledShortage} workers</strong>
            </div>
            <div className="shortage-stat">
              <span>Semi-skilled Workers Shortage</span>
              <strong>{semiShortage} workers</strong>
            </div>
            <div className="shortage-stat">
              <span>Unskilled Workers Shortage</span>
              <strong>{unskilledShortage} workers</strong>
            </div>
            <div className="shortage-pct">
              <span>Shortage Percentage</span>
              <strong>{shortagePct}%</strong>
              <small>of total demand</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3>4. Calculation Preview</h3>
        </div>
        <div className="card-body preview-grid">
          <div className="preview-box">
            <div>Shortage = Workers Needed − Workers Present</div>
            <div>
              Total Shortage = {form.totalRequired} − {form.totalConfirmed} ={" "}
              <strong>{totalShortage} workers</strong>
            </div>
            <div>
              Shortage % = ({totalShortage} / {form.totalRequired}) × 100 ={" "}
              <strong>{shortagePct}%</strong>
            </div>
          </div>
          <label>
            Notes (Optional)
            <textarea
              value={form.notes}
              onChange={set("notes")}
              placeholder="Add any observations or reasons for shortage..."
            />
          </label>
        </div>
        <div className="card-foot-right">
          <button className="btn-primary" onClick={save}>
            Save &amp; Calculate Shortage
          </button>
        </div>
      </div>
    </div>
  );
}
