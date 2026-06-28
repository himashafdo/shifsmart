import { Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { PageHead } from "../components/Bits";
import { NOTIFICATIONS } from "../data";

export default function Notifications() {
  const all = [...NOTIFICATIONS, ...NOTIFICATIONS];
  return (
    <div className="page">
      <PageHead title="Notifications" />
      <div className="card">
        <div className="card-body">
          {all.map((n, i) => {
            const Ico = n.icon === "shift" ? Clock : n.icon === "check" ? CheckCircle : n.icon === "risk" ? AlertCircle : FileText;
            return (
              <div className="notif big" key={i}>
                <Ico size={18} className={"notif-ico " + n.icon} />
                <div><div>{n.text}</div><small>{n.time}</small></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
