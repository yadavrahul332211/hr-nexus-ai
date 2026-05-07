import { motion } from "framer-motion";
import {
  Users, Briefcase, CalendarCheck, Target, Clock, DollarSign,
  TrendingUp, AlertTriangle, Award, Sparkles, CheckCircle2, FileText,
  UserCheck, Activity, Info
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
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  employees, candidates, weeklyAttendance, payrollRows, payrollTrend,
  leaveRequests, departmentSplit, hiringTrend, aiInsightsByRole,
  myAttendance, myPayslip, myTasks, fmtMoney, stageColor
} from "@/data/mockHr";

const COLORS = ["hsl(174,72%,40%)", "hsl(262,60%,55%)", "hsl(38,92%,50%)", "hsl(210,80%,55%)", "hsl(152,60%,42%)", "hsl(340,72%,55%)"];
const tooltip = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

function InsightList({ role }: { role: "admin" | "manager" | "employee" }) {
  const icons = {
    positive: <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />,
    warn: <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />,
    primary: <Award className="w-4 h-4 text-primary mt-0.5 shrink-0" />,
    info: <Info className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />,
  };
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="font-semibold">AI Insights</h3>
      </div>
      <ul className="space-y-3 text-sm">
        {aiInsightsByRole[role].map((i, idx) => (
          <li key={idx} className="flex gap-2">{icons[i.tone]} {i.text}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- ADMIN ---------------- */
function AdminDashboard() {
  const totalWorkforce = departmentSplit.reduce((a, b) => a + b.value, 0);
  const openCandidates = candidates.filter(c => !["Hired", "Rejected"].includes(c.stage)).length;
  const monthlyPayroll = payrollRows.reduce((a, b) => a + b.net, 0) * 12; // scale up

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workforce" value={totalWorkforce.toLocaleString()} change="+12 this month" changeType="up" icon={Users} />
        <StatCard title="Open Pipeline" value={String(openCandidates)} change="5 in interview" changeType="neutral" icon={Briefcase} />
        <StatCard title="Monthly Payroll" value={fmtMoney(monthlyPayroll / 12)} change="+3.4% vs May" changeType="up" icon={DollarSign} />
        <StatCard title="Attrition Risk" value="4.8%" change="-0.6% vs Q1" changeType="up" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Hiring vs Attrition</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hiringTrend}>
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
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={departmentSplit} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                {departmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
            {departmentSplit.map((d, i) => (
              <span key={d.name} className="text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Payroll Forecast (in $K)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={payrollTrend}>
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
        <InsightList role="admin" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Hires</h3>
            <Badge variant="secondary">{employees.length} active</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.slice(0, 6).map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="text-sm font-medium">{e.name}</div>
                      <div className="text-xs text-muted-foreground">{e.role}</div>
                    </TableCell>
                    <TableCell className="text-sm">{e.department}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{e.status}</Badge></TableCell>
                    <TableCell className="text-right text-sm">{fmtMoney(e.salary)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">AI-Ranked Pipeline</h3>
            <Badge variant="secondary">Top {candidates.length}</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-right">AI Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.slice(0, 6).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.role}</div>
                    </TableCell>
                    <TableCell><span className={`text-[10px] px-2 py-0.5 rounded ${stageColor(c.stage)}`}>{c.stage}</span></TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-semibold gradient-text">{c.aiScore}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- MANAGER ---------------- */
function ManagerDashboard() {
  const team = employees.filter((e) => e.manager === "John Doe");
  const teamPerf = team.map((e) => ({ name: e.name.split(" ")[0], score: Math.round(e.performance * 10) }));
  const avgPerf = (team.reduce((a, b) => a + b.performance, 0) / team.length).toFixed(1);
  const avgAttendance = (team.reduce((a, b) => a + b.attendanceRate, 0) / team.length).toFixed(1);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Team Size" value={String(team.length)} change="2 new this quarter" changeType="up" icon={Users} />
        <StatCard title="Pending Approvals" value={String(leaveRequests.filter(l => l.status === "Pending").length)} change="3 urgent" changeType="neutral" icon={CheckCircle2} />
        <StatCard title="Team Attendance" value={`${avgAttendance}%`} change="+2% WoW" changeType="up" icon={CalendarCheck} />
        <StatCard title="Avg Performance" value={`${avgPerf}/10`} change="+0.4 vs Q1" changeType="up" icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Team Performance Score</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={teamPerf} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={70} />
              <Tooltip contentStyle={tooltip} />
              <Bar dataKey="score" fill="hsl(174,72%,40%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            {leaveRequests.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{a.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{a.type} · {a.days}d · {a.from}</p>
                </div>
                <div className="flex gap-1 shrink-0">
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
          <h3 className="font-semibold mb-4">Team Attendance — This Week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyAttendance.map((w, i) => ({
              d: w.d,
              attendance: Math.round(85 + Math.cos(i) * 4 + i),
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltip} />
              <Line type="monotone" dataKey="attendance" stroke="hsl(174,72%,40%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <InsightList role="manager" />
      </div>

      <div className="glass-card rounded-xl p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">My Direct Reports</h3>
          <Badge variant="secondary">{team.length} members</Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Productivity</TableHead>
                <TableHead>Burnout</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="text-sm font-medium">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{e.role}</div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{e.status}</Badge></TableCell>
                  <TableCell className="w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={e.productivity} className="h-1.5" />
                      <span className="text-xs text-muted-foreground">{e.productivity}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      e.burnoutRisk === "high" ? "bg-destructive/15 text-destructive text-[10px]" :
                      e.burnoutRisk === "medium" ? "bg-amber-500/15 text-amber-500 text-[10px]" :
                      "bg-emerald-500/15 text-emerald-500 text-[10px]"
                    }>{e.burnoutRisk}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">{e.performance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

/* ---------------- EMPLOYEE ---------------- */
function EmployeeDashboard() {
  const me = employees[0]; // Alice as default
  const productivity = myAttendance.map((a) => ({ d: a.d, v: Math.round(a.hours * 11) }));
  const goals = [{ name: "OKR Q2", value: 72, fill: "hsl(174,72%,40%)" }];
  const totalHours = myAttendance.reduce((a, b) => a + b.hours, 0).toFixed(1);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Hours This Week" value={`${totalHours}h`} change="2h to go" changeType="neutral" icon={Clock} />
        <StatCard title="Leave Balance" value="14 days" change="3 used in Q2" changeType="up" icon={CalendarCheck} />
        <StatCard title="Performance" value={`${me.performance}/10`} change="Top 15%" changeType="up" icon={Target} />
        <StatCard title="Next Payday" value={myPayslip.payDate} change={`${fmtMoney(myPayslip.net)} net`} changeType="neutral" icon={DollarSign} />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">My Attendance</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAttendance.map((a) => (
                <TableRow key={a.d}>
                  <TableCell className="text-sm">{a.d}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{a.status}</Badge></TableCell>
                  <TableCell className="text-right text-sm">{a.hours}h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">My Tasks</h3>
          <ul className="space-y-2">
            {myTasks.map((t) => (
              <li key={t.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${t.done ? "text-emerald-500" : "text-muted-foreground"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</p>
                  <p className="text-xs text-muted-foreground">Due {t.due}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <InsightList role="employee" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Latest Payslip</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Base salary</span><span>{fmtMoney(myPayslip.base)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Performance bonus</span><span className="text-emerald-500">+{fmtMoney(myPayslip.bonus)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax & deductions</span><span className="text-destructive">-{fmtMoney(myPayslip.deductions)}</span></div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
              <span>Net pay</span><span className="gradient-text">{fmtMoney(myPayslip.net)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Pay date: {myPayslip.payDate}</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start"><CalendarCheck className="w-4 h-4 mr-2" /> Request Leave</Button>
            <Button variant="outline" className="justify-start"><FileText className="w-4 h-4 mr-2" /> View Payslip</Button>
            <Button variant="outline" className="justify-start"><UserCheck className="w-4 h-4 mr-2" /> Clock In</Button>
            <Button variant="outline" className="justify-start"><Target className="w-4 h-4 mr-2" /> Update Goals</Button>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Wellness score</p>
            <Progress value={82} className="mb-1" />
            <p className="text-[11px] text-muted-foreground">82/100 · keep taking your evening breaks 🌿</p>
          </div>
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
