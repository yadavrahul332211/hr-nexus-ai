import type { Role } from "@/stores/authStore";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: "Engineering" | "Design" | "Marketing" | "Sales" | "HR" | "Finance";
  manager?: string;
  status: "Active" | "On Leave" | "Probation" | "Notice";
  joinedAt: string;
  salary: number;
  performance: number; // 0-10
  productivity: number; // 0-100
  attendanceRate: number; // 0-100
  burnoutRisk: "low" | "medium" | "high";
  avatar?: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";
  aiScore: number; // 0-100
  appliedAt: string;
  source: "LinkedIn" | "Referral" | "Website" | "Indeed";
}

export interface AttendanceEntry {
  employeeId: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "Remote" | "Leave";
  hours: number;
}

export interface PayrollRow {
  employeeId: string;
  name: string;
  department: string;
  base: number;
  bonus: number;
  deductions: number;
  net: number;
  status: "Paid" | "Pending" | "Processing";
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Sick" | "Vacation" | "Remote" | "Personal";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Denied";
}

/* ---------------- Employees ---------------- */
export const employees: Employee[] = [
  { id: "E001", name: "Alice Kim", email: "alice@aiinsight.co", role: "Senior Engineer", department: "Engineering", manager: "John Doe", status: "Active", joinedAt: "2022-03-12", salary: 142000, performance: 9.2, productivity: 92, attendanceRate: 97, burnoutRisk: "low" },
  { id: "E002", name: "Bob Martin", email: "bob@aiinsight.co", role: "Backend Engineer", department: "Engineering", manager: "John Doe", status: "Active", joinedAt: "2021-08-04", salary: 118000, performance: 7.8, productivity: 78, attendanceRate: 91, burnoutRisk: "medium" },
  { id: "E003", name: "Carol Patel", email: "carol@aiinsight.co", role: "Product Designer", department: "Design", manager: "John Doe", status: "Active", joinedAt: "2023-01-20", salary: 96000, performance: 8.5, productivity: 85, attendanceRate: 94, burnoutRisk: "low" },
  { id: "E004", name: "Dan Rivera", email: "dan@aiinsight.co", role: "QA Engineer", department: "Engineering", manager: "John Doe", status: "Probation", joinedAt: "2024-11-02", salary: 78000, performance: 6.4, productivity: 64, attendanceRate: 82, burnoutRisk: "high" },
  { id: "E005", name: "Eve Chen", email: "eve@aiinsight.co", role: "ML Engineer", department: "Engineering", manager: "John Doe", status: "Active", joinedAt: "2022-06-18", salary: 156000, performance: 8.8, productivity: 88, attendanceRate: 96, burnoutRisk: "low" },
  { id: "E006", name: "Frank Owusu", email: "frank@aiinsight.co", role: "DevOps", department: "Engineering", manager: "John Doe", status: "Active", joinedAt: "2020-02-10", salary: 132000, performance: 7.3, productivity: 73, attendanceRate: 89, burnoutRisk: "medium" },
  { id: "E007", name: "Grace Lee", email: "grace@aiinsight.co", role: "Marketing Lead", department: "Marketing", status: "Active", joinedAt: "2021-05-22", salary: 124000, performance: 8.1, productivity: 81, attendanceRate: 93, burnoutRisk: "low" },
  { id: "E008", name: "Henry Singh", email: "henry@aiinsight.co", role: "Account Executive", department: "Sales", status: "Active", joinedAt: "2023-09-11", salary: 88000, performance: 9.0, productivity: 90, attendanceRate: 95, burnoutRisk: "low" },
  { id: "E009", name: "Iris Müller", email: "iris@aiinsight.co", role: "HR Partner", department: "HR", status: "Active", joinedAt: "2022-04-01", salary: 92000, performance: 8.4, productivity: 84, attendanceRate: 98, burnoutRisk: "low" },
  { id: "E010", name: "Jack Tan", email: "jack@aiinsight.co", role: "Finance Analyst", department: "Finance", status: "On Leave", joinedAt: "2021-11-30", salary: 102000, performance: 7.6, productivity: 76, attendanceRate: 86, burnoutRisk: "medium" },
  { id: "E011", name: "Kira Volkov", email: "kira@aiinsight.co", role: "UX Researcher", department: "Design", status: "Active", joinedAt: "2023-07-05", salary: 89000, performance: 8.2, productivity: 82, attendanceRate: 94, burnoutRisk: "low" },
  { id: "E012", name: "Liam Brown", email: "liam@aiinsight.co", role: "SDR", department: "Sales", status: "Notice", joinedAt: "2024-02-14", salary: 62000, performance: 5.9, productivity: 59, attendanceRate: 78, burnoutRisk: "high" },
];

/* ---------------- Candidates ---------------- */
export const candidates: Candidate[] = [
  { id: "C001", name: "Maya Iyer", role: "Senior Frontend Engineer", stage: "Interview", aiScore: 92, appliedAt: "2026-04-21", source: "LinkedIn" },
  { id: "C002", name: "Noah Park", role: "Product Manager", stage: "Offer", aiScore: 88, appliedAt: "2026-04-18", source: "Referral" },
  { id: "C003", name: "Olivia Reyes", role: "Data Scientist", stage: "Screening", aiScore: 81, appliedAt: "2026-04-30", source: "Website" },
  { id: "C004", name: "Pavel Novak", role: "Backend Engineer", stage: "Applied", aiScore: 74, appliedAt: "2026-05-02", source: "Indeed" },
  { id: "C005", name: "Quincy Adams", role: "DevRel", stage: "Hired", aiScore: 95, appliedAt: "2026-03-28", source: "LinkedIn" },
  { id: "C006", name: "Rina Sato", role: "Designer", stage: "Rejected", aiScore: 58, appliedAt: "2026-04-11", source: "Website" },
  { id: "C007", name: "Sam Holt", role: "SRE", stage: "Interview", aiScore: 86, appliedAt: "2026-04-24", source: "Referral" },
  { id: "C008", name: "Tara Ali", role: "Marketing Manager", stage: "Screening", aiScore: 79, appliedAt: "2026-05-01", source: "LinkedIn" },
];

/* ---------------- Attendance (last 5 weekdays) ---------------- */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const weeklyAttendance = days.map((d, i) => ({
  d,
  present: 1100 + Math.round(Math.sin(i) * 30) + i * 8,
  remote: 90 + i * 5,
  absent: 28 - i * 3,
}));

export const myAttendance = [
  { d: "Mon", hours: 8.2, status: "Present" },
  { d: "Tue", hours: 7.8, status: "Remote" },
  { d: "Wed", hours: 8.5, status: "Present" },
  { d: "Thu", hours: 6.4, status: "Late" },
  { d: "Fri", hours: 8.0, status: "Remote" },
];

/* ---------------- Payroll ---------------- */
export const payrollRows: PayrollRow[] = employees.slice(0, 8).map((e) => {
  const bonus = Math.round(e.salary * (e.performance / 100));
  const deductions = Math.round(e.salary * 0.18);
  return {
    employeeId: e.id,
    name: e.name,
    department: e.department,
    base: Math.round(e.salary / 12),
    bonus: Math.round(bonus / 12),
    deductions: Math.round(deductions / 12),
    net: Math.round((e.salary + bonus - deductions) / 12),
    status: e.status === "On Leave" ? "Pending" : "Paid",
  };
});

export const payrollTrend = [
  { m: "Jan", v: 420 }, { m: "Feb", v: 435 }, { m: "Mar", v: 460 },
  { m: "Apr", v: 478 }, { m: "May", v: 495 }, { m: "Jun", v: 512 },
];

export const myPayslip = {
  base: 8200,
  bonus: 720,
  deductions: 1480,
  net: 7440,
  payDate: "2026-05-30",
};

/* ---------------- Leave requests ---------------- */
export const leaveRequests: LeaveRequest[] = [
  { id: "L001", employeeId: "E001", employeeName: "Alice Kim", type: "Vacation", from: "2026-05-12", to: "2026-05-14", days: 3, status: "Pending" },
  { id: "L002", employeeId: "E002", employeeName: "Bob Martin", type: "Remote", from: "2026-05-08", to: "2026-05-15", days: 5, status: "Pending" },
  { id: "L003", employeeId: "E003", employeeName: "Carol Patel", type: "Sick", from: "2026-05-07", to: "2026-05-08", days: 1, status: "Pending" },
  { id: "L004", employeeId: "E004", employeeName: "Dan Rivera", type: "Personal", from: "2026-05-20", to: "2026-05-20", days: 1, status: "Pending" },
];

/* ---------------- Department split ---------------- */
export const departmentSplit = (() => {
  const map = new Map<string, number>();
  employees.forEach((e) => map.set(e.department, (map.get(e.department) ?? 0) + 1));
  // pad with realistic org-wide numbers
  const padded: Record<string, number> = { Engineering: 480, Design: 96, Marketing: 142, Sales: 268, HR: 54, Finance: 78 };
  return Object.entries(padded).map(([name, value]) => ({ name, value }));
})();

/* ---------------- Hiring trend ---------------- */
export const hiringTrend = [
  { month: "Jan", hired: 12, left: 3 },
  { month: "Feb", hired: 8, left: 2 },
  { month: "Mar", hired: 15, left: 4 },
  { month: "Apr", hired: 10, left: 1 },
  { month: "May", hired: 18, left: 5 },
  { month: "Jun", hired: 14, left: 2 },
];

/* ---------------- AI insights per role ---------------- */
export const aiInsightsByRole: Record<Role, { tone: "positive" | "warn" | "info" | "primary"; text: string }[]> = {
  admin: [
    { tone: "positive", text: "Engineering productivity up 8% this sprint." },
    { tone: "warn", text: "14 employees show burnout risk — review workloads." },
    { tone: "primary", text: "Suggest promotion for 3 high-performers in Sales." },
    { tone: "info", text: "Predicted attrition: 6 likely exits in Q3." },
  ],
  manager: [
    { tone: "warn", text: "Dan Rivera shows declining engagement — schedule a 1:1." },
    { tone: "primary", text: "Alice Kim is ready for a senior-level project." },
    { tone: "positive", text: "Team velocity up 12% this sprint." },
    { tone: "info", text: "2 leave conflicts detected for week of May 12." },
  ],
  employee: [
    { tone: "positive", text: "You're on track to hit your Q2 OKRs (72%)." },
    { tone: "info", text: "Upcoming training: 'Advanced React Patterns' on May 14." },
    { tone: "warn", text: "You worked 47h last week — consider pacing this week." },
  ],
};

/* ---------------- My tasks (employee) ---------------- */
export const myTasks = [
  { id: 1, title: "Submit weekly timesheet", due: "Today", done: false },
  { id: 2, title: "Review design spec PR #482", due: "Tomorrow", done: false },
  { id: 3, title: "Complete compliance training", due: "May 12", done: true },
  { id: 4, title: "1:1 with manager", due: "May 09", done: false },
];

/* ---------------- Helpers ---------------- */
export const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const stageColor = (s: Candidate["stage"]) =>
  ({
    Applied: "bg-muted text-muted-foreground",
    Screening: "bg-blue-500/15 text-blue-500",
    Interview: "bg-purple-500/15 text-purple-500",
    Offer: "bg-amber-500/15 text-amber-500",
    Hired: "bg-emerald-500/15 text-emerald-500",
    Rejected: "bg-destructive/15 text-destructive",
  }[s]);