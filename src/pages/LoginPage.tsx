import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Github, Chrome, Shield, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, type Role } from "@/stores/authStore";
import { toast } from "sonner";

const roles: { value: Role; label: string; icon: typeof Shield; desc: string }[] = [
  { value: "admin", label: "HR Admin", icon: Shield, desc: "Full org control" },
  { value: "manager", label: "Manager", icon: Briefcase, desc: "Team & approvals" },
  { value: "employee", label: "Employee", icon: User, desc: "Personal workspace" },
];

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("admin");
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = () => {
    if (!email) return toast.error("Please enter your email");
    login(email, role, name);
    toast.success(`Welcome${name ? ", " + name : ""}! Signed in as ${role}.`);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">AIInsight HR</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-Powered Workforce Intelligence</p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold">{isSignup ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-sm text-muted-foreground">{isSignup ? "Start your free trial" : "Sign in to your workspace"}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={handleSubmit}><Chrome className="w-4 h-4 mr-2" /> Google</Button>
            <Button variant="outline" className="w-full" onClick={handleSubmit}><Github className="w-4 h-4 mr-2" /> GitHub</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or continue with email</span></div>
          </div>

          <div className="space-y-4">
            {isSignup && <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" /></div>}
            <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" /></div>
            <div><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>

            <div>
              <Label className="mb-2 block">Sign in as</Label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`p-3 rounded-xl border text-left transition-all ${active ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${active ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="text-xs font-semibold">{r.label}</div>
                      <div className="text-[10px] text-muted-foreground">{r.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              {isSignup ? "Create Account" : "Sign In"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline font-medium">
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
