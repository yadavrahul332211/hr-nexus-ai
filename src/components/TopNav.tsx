import { Bell, Search, Moon, Sun, Menu, Shield, Briefcase, User, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuthStore, roleLabel, type Role } from "@/stores/authStore";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TopNavProps { onMenuClick?: () => void }
export function TopNav({ onMenuClick }: TopNavProps) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const navigate = useNavigate();
  const { user, logout, setRole } = useAuthStore();
  const initials = (user?.name || "User")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const handleLogout = () => { logout(); toast.success("Signed out"); navigate("/login"); };
  const handleRoleSwitch = (r: Role) => { setRole(r); toast.success(`Switched to ${roleLabel(r)} view`); };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-lg flex items-center justify-between px-4 md:px-6 shrink-0 gap-3">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden shrink-0">
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search anything..." className="pl-9 bg-secondary/50 border-0 focus-visible:ring-1" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} className="text-muted-foreground">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-medium">{user?.name ?? "Guest"}</span>
                {user && <span className="text-[10px] text-muted-foreground">{roleLabel(user.role)}</span>}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user && (
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                <Badge variant="secondary" className="mt-1 text-[10px]">{roleLabel(user.role)}</Badge>
              </div>
            )}
            <DropdownMenuSeparator />
            <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Switch role</div>
            {(["admin", "manager", "employee"] as Role[]).map((r) => {
              const Icon = r === "admin" ? Shield : r === "manager" ? Briefcase : User;
              const active = user?.role === r;
              return (
                <DropdownMenuItem key={r} onClick={() => handleRoleSwitch(r)} className="gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{roleLabel(r)}</span>
                  {active && <Check className="w-3.5 h-3.5 text-primary" />}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
