// ===== Dummy data — no backend, demo only =====

export const ADMIN = { username: "admin", password: "shift123" };

export const KPIS = {
  workersPresent: 96,
  workersRequested: 108,
  presentPct: 88.9,
  onTimeDelivery: 92,
  ordersInProgress: 18,
  ordersAtRisk: 5,
  ordersCompletedToday: 12,
  ordersThisWeek: 65,
  noShowRate: 12,
};

export const ATTENDANCE_BREAKDOWN = [
  { label: "Present", value: 96, pct: 88.9, color: "#2e9e5b" },
  { label: "Absent", value: 8, pct: 7.4, color: "#e0524d" },
  { label: "Late", value: 4, pct: 3.7, color: "#e6a23c" },
  { label: "On Leave", value: 0, pct: 0, color: "#9aa7b8" },
];

export const ORDER_BREAKDOWN = [
  { label: "Completed", value: 12, pct: 66.7, color: "#2e9e5b" },
  { label: "In Progress", value: 5, pct: 27.8, color: "#3b6ca8" },
  { label: "At Risk", value: 1, pct: 5.5, color: "#e6a23c" },
  { label: "Delayed", value: 0, pct: 0, color: "#e0524d" },
];

export const DELIVERY_TREND = [
  { day: "11 May", value: 50 },
  { day: "12 May", value: 64 },
  { day: "13 May", value: 60 },
  { day: "14 May", value: 78 },
  { day: "15 May", value: 84 },
  { day: "16 May", value: 92 },
];

export const ORDERS = [
  {
    id: "ORD001",
    customer: "Brandix",
    due: "25 Jul 2026",
    progress: 80,
    stage: "Quality Inspection",
    status: "In Progress",
    risk: "Low",
  },
  {
    id: "ORD002",
    customer: "MAS Holdings",
    due: "26 Jul 2026",
    progress: 100,
    stage: "Completed",
    status: "Completed",
    risk: "-",
  },
  {
    id: "ORD003",
    customer: "Hela Apparel",
    due: "27 Jul 2026",
    progress: 40,
    stage: "Washing",
    status: "In Progress",
    risk: "High",
  },
  {
    id: "ORD004",
    customer: "Kelly Fedler",
    due: "28 Jul 2026",
    progress: 60,
    stage: "Dyeing",
    status: "In Progress",
    risk: "Medium",
  },
  {
    id: "ORD005",
    customer: "Dilly & Carsons",
    due: "29 Jul 2026",
    progress: 20,
    stage: "Washing",
    status: "In Progress",
    risk: "High",
  },
];

export const ORDERS_AT_RISK = [
  {
    id: "ORD003",
    customer: "Hela Apparel",
    due: "27 Jul 2026",
    level: "High",
    reason: "Labour Shortage",
  },
  {
    id: "ORD006",
    customer: "Brandix",
    due: "30 Jul 2026",
    level: "Medium",
    reason: "Worker No-Shows",
  },
  {
    id: "ORD007",
    customer: "MAS Holdings",
    due: "31 Jul 2026",
    level: "Medium",
    reason: "High Absenteeism",
  },
];

export const KPI_LIST = [
  { label: "On-Time Delivery Rate", value: "92%" },
  { label: "Total Orders (This Month)", value: "65" },
  { label: "Orders Completed", value: "42" },
  { label: "Orders Delayed", value: "2" },
  { label: "Labour Utilization", value: "87%" },
  { label: "Avg. No-Show Rate", value: "12%" },
];

export const UPCOMING_SHIFTS = [
  {
    shift: "Day Shift",
    date: "18 May 2026",
    requested: 120,
    confirmed: 108,
    status: "Confirmed",
  },
  {
    shift: "Night Shift",
    date: "18 May 2026",
    requested: 100,
    confirmed: 92,
    status: "Pending",
  },
  {
    shift: "Day Shift",
    date: "19 May 2026",
    requested: 120,
    confirmed: null,
    status: "Waiting",
  },
  {
    shift: "Night Shift",
    date: "19 May 2026",
    requested: 100,
    confirmed: null,
    status: "Waiting",
  },
];

export const LABOUR_VS_DEMAND = [
  { shift: "Day Shift", needed: 120, present: 108 },
  { shift: "Night Shift", needed: 100, present: 96 },
];

export const NOTIFICATIONS = [
  {
    icon: "shift",
    text: "Shift Request SR-0021 confirmed by Agency A",
    time: "2 min ago",
  },
  {
    icon: "check",
    text: "Worker Kamal Perera checked-in for Day Shift",
    time: "15 min ago",
  },
  { icon: "risk", text: "Order ORD003 is at High Risk", time: "30 min ago" },
  {
    icon: "report",
    text: "Attendance report generated successfully",
    time: "1 hr ago",
  },
];

export const WORKERS = [
  {
    id: "W001",
    name: "Kamal Perera",
    age: 29,
    skills: " Washing",
    experience: "3 Years",
    status: "Active",
  },
  {
    id: "W002",
    name: "Nimal Fernando",
    age: 34,
    skills: "Machine Operator",
    experience: "5 Years",
    status: "Active",
  },
  {
    id: "W003",
    name: "Saman Kumara",
    age: 27,
    skills: "Packing",
    experience: "2 Years",
    status: "Active",
  },
  {
    id: "W004",
    name: "Wasana Silva",
    age: 31,
    skills: "Drying, Ironing",
    experience: "4 Years",
    status: "Active",
  },
  {
    id: "W005",
    name: "Thilak Jayasinghe",
    age: 25,
    skills: "Washing, Ironing",
    experience: "1 Year",
    status: "Inactive",
  },
  {
    id: "W006",
    name: "Ruwan Bandara",
    age: 38,
    skills: "Machine Operator",
    experience: "8 Years",
    status: "Active",
  },
  {
    id: "W007",
    name: "Dilani Rajapaksa",
    age: 26,
    skills: "Packing",
    experience: "2 Years",
    status: "Active",
  },
];

export const ALLOCATIONS = [
  {
    id: "W001",
    name: "Kamal Perera",
    skills: "Washing",
    role: "Washing",
    status: "Allocated",
  },
  {
    id: "W002",
    name: "Nimal Fernando",
    skills: "Machine Operator",
    role: "Washing Machine Operator",
    status: "Allocated",
  },
  {
    id: "W003",
    name: "Saman Kumara",
    skills: "Packing",
    role: "Packing",
    status: "Allocated",
  },
  {
    id: "W004",
    name: "Wasana Silva",
    skills: "Drying, Ironing",
    role: "Drying",
    status: "Allocated",
  },
  {
    id: "W005",
    name: "Thilak Jayasinghe",
    skills: " Washing",
    role: "Washing",
    status: "Pending",
  },
];

export const TOP_WORKERS = [
  { name: "Nimal Fernando", rating: 96 },
  { name: "Kamal Perera", rating: 92 },
  { name: "Wasana Silva", rating: 90 },
  { name: "Saman Kumara", rating: 88 },
  { name: "Thilak Jayasinghe", rating: 85 },
];

export const ATTENDANCE_TREND = [
  { day: "01 May", value: 90 },
  { day: "03 May", value: 85 },
  { day: "05 May", value: 92 },
  { day: "07 May", value: 78 },
  { day: "09 May", value: 88 },
  { day: "12 May", value: 95 },
];

export const AGENCY_REQUESTS = [
  {
    id: "REQ001",
    shift: "Day Shift",
    date: "12 May 2026",
    workers: 120,
    status: "Pending",
  },
  {
    id: "REQ002",
    shift: "Night Shift",
    date: "12 May 2026",
    workers: 100,
    status: "Confirmed",
  },
  {
    id: "REQ003",
    shift: "Day Shift",
    date: "13 May 2026",
    workers: 120,
    status: "Pending",
  },
];

export const USERS = [
  { id: "U001", name: "Saman Perera", role: "Admin", status: "Active" },
  {
    id: "U002",
    name: "Nimal Jayasekara",
    role: "HR Manager",
    status: "Active",
  },
  { id: "U003", name: "Kamal Perera", role: "Supervisor", status: "Active" },
  { id: "U004", name: "Lakshan Silva", role: "Agency User", status: "Active" },
];
