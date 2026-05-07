import { motion } from "framer-motion";
import {
  Users, Briefcase, CalendarCheck, Target, Clock, DollarSign,
  TrendingUp, AlertTriangle, Award, Sparkles, CheckCircle2, FileText,
  UserCheck, Activity
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar
} from "recharts";
import { useAuthStore, roleLabel } from "@/stores/authStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const COLORS = ["hsl(174,72%,40%)", "hsl(262,60%,55%)", "hsl(38,92%,50%)", "hsl(210,80%,55%)", "hsl(152,60%,42%)"];
const tooltip = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

/* ---------------- ADMIN ---------------- */
function AdminDashboard() {
  const hiring = [
    { month: "Jan", hired: 12, left: 3 }, { month: "Feb", hired: 8, left: 2 },
    { month: "Mar", hired: 15, left: 4 }, { month: "Apr", hired: 10, left: 1 },
    { month: "May", hired: 18, left: 5 }, { month: "Jun", hired: 14, left: 2 },
  ];
  const dept = [
    { name: "Engineering", value: 45 }, { name: "Design", value: 15 },
    { name: "Marketing", value: 20 }, { name: "Sales", value: 25 }, { name: "HR", value: 10 },
  ];
  const payroll = [
    { m: "Jan", v: 420 }, { m: "Feb", v: 435 }, { m: "Mar", v: 460 },
    { m: "Apr", v: 478 }, { m: "May", v: 495 }, { m: "Jun", v: 512 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workforce" value="1,248" change="+12 this month" changeType="up" icon={Users} />
        <StatCard title="Open Positions" value="23" change="5 closing soon" changeType="neutral" icon={Briefcase} />
        <StatCard title="Monthly Payroll" value="$512K" change="+3.4% vs May" changeType="up" icon={DollarSign} />
        <StatCard title="Attrition Risk" value="4.8%" change="-0.6% vs Q1" changeType="up" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Hiring vs Attrition</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hiring}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltip} />
              <Bar dataKey="hired" fill="hsl(174,72%,40%)" radius={[4,4,0,0]} />
              <Bar dataKey="left" fill="hsl(0,72%,55%)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Department Split</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={dept} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                {dept.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Payroll Forecast (in $K)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={payroll}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(262,60%,55%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(262,60%,55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltip} />
              <Area type="monotone" dataKey="v" stroke="hsl(262,60%,55%)" fill="url(#pg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">AI Insights</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Engineering productivity up 8% this sprint.</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> 14 employees show burnout risk — review workloads.</li>
            <li className="flex gap-2"><Award className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Suggest promotion for 3 high-performers in Sales.</li>
            <li className="flex gap-2"><Activity className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Predicted attrition: 6 likely exits in Q3.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* ---------------- MANAGER ---------------- */
function ManagerDashboard() {
  const team = [
    { name: "Alice", score: 92 }, { name: "Bob", score: 78 }, { name: "Carol", score: 85 },
    { name: "Dan", score: 64 }, { name: "Eve", score: 88 }, { name: "Frank", score: 73 },
  ];
  const week = [
    { d: "Mon", v: 92 }, { d: "Tue", v: 96 }, { d: "Wed", v: 89 },
    { d: "Thu", v: 94 }, { d: "Fri", v: 85 },
  ];
  const approvals = [
    { who: "Alice K.", type: "Leave Request", days: "3 days" },
    { who: "Bob M.", type: "Expense", days: "$420" },
    { who: "Carol P.", type: "Remote Work", days: "1 week" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Team Size" value="14" change="2 new this quarter" changeType="up" icon={Users} />
        <StatCard title="Pending Approvals" value="7" change="3 urgent" changeType="neutral" icon={CheckCircle2} />
        <StatCard title="Team Attendance" value="91.4%" change="+2% WoW" changeType="up" icon={CalendarCheck} />
        <StatCard title="Avg Performance" value="8.1/10" change="+0.4 vs Q1" changeType="up" icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Team Performance Score</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={team} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={60} />
              <Tooltip contentStyle={tooltip} />
              <Bar dataKey="score" fill="hsl(174,72%,40%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            {approvals.map((a) => (
              <div key={a.who} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                <div>
                  <p className="text-sm font-medium">{a.who}</p>
                  <p className="text-xs text-muted-foreground">{a.type} · {a.days}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Deny</Button>
                  <Button size="sm" className="h-7 px-2 text-xs">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Weekly Team Attendance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={week}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltip} />
              <Line type="monotone" dataKey="v" stroke="hsl(174,72%,40%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">AI Suggestions</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Dan shows declining engagement — schedule a 1:1.</li>
            <li className="flex gap-2"><Award className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Alice ready for a senior-level project.</li>
            <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Team velocity up 12% this sprint.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* ---------------- EMPLOYEE ---------------- */
function EmployeeDashboard() {
  const productivity = [
    { d: "Mon", v: 78 }, { d: "Tue", v: 85 }, { d: "Wed", v: 91 },
    { d: "Thu", v: 82 }, { d: "Fri", v: 88 },
  ];
  const goals = [
    { name: "OKR Q2", value: 72, fill: "hsl(174,72%,40%)" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Hours This Week" value="38h" change="2h to go" changeType="neutral" icon={Clock} />
        <StatCard title="Leave Balance" value="14 days" change="3 used in Q2" changeType="up" icon={CalendarCheck} />
        <StatCard title="Performance" value="8.6/10" change="Top 15%" changeType="up" icon={Target} />
        <StatCard title="Next Payday" value="Jun 30" change="$5,420 expected" changeType="neutral" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">My Productivity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={productivity}>
              <defs>
                <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(174,72%,40%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(174,72%,40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltip} />
              <Area type="monotone" dataKey="v" stroke="hsl(174,72%,40%)" fill="url(#eg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Goal Progress</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadialBarChart innerRadius="60%" outerRadius="100%" data={goals} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-center text-2xl font-bold gradient-text -mt-4">72%</p>
          <p className="text-center text-xs text-muted-foreground">3 of 5 OKRs on track</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start"><CalendarCheck className="w-4 h-4 mr-2" /> Request Leave</Button>
            <Button variant="outline" className="justify-start"><FileText className="w-4 h-4 mr-2" /> View Payslip</Button>
            <Button variant="outline" className="justify-start"><UserCheck className="w-4 h-4 mr-2" /> Clock In</Button>
            <Button variant="outline" className="justify-start"><Target className="w-4 h-4 mr-2" /> Update Goals</Button>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">AI Wellness Check</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Your work-life balance score is healthy.</p>
          <Progress value={82} className="mb-2" />
          <p className="text-xs text-muted-foreground">82/100 · keep taking your evening breaks 🌿</p>
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? "admin";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-header">Welcome back, {user?.name?.split(" ")[0] ?? "there"}</h1>
          <p className="page-subheader">
            {role === "admin" && "Org-wide workforce intelligence at a glance."}
            {role === "manager" && "Monitor your team's health, performance and approvals."}
            {role === "employee" && "Your personal workspace, goals and wellbeing."}
          </p>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <Sparkles className="w-3 h-3" /> {roleLabel(role)} View
        </Badge>
      </div>

      {role === "admin" && <AdminDashboard />}
      {role === "manager" && <ManagerDashboard />}
      {role === "employee" && <EmployeeDashboard />}
    </motion.div>
  );
}
