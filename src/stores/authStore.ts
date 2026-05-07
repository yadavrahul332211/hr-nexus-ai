import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "manager" | "employee";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, role: Role, name?: string) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

const fakeJwt = (payload: object) =>
  `eyJhbGciOiJIUzI1NiJ9.${btoa(JSON.stringify(payload))}.sig_${Math.random().toString(36).slice(2, 10)}`;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (email, role, name) => {
        const displayName =
          name?.trim() ||
          email
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
        const user: AuthUser = {
          id: crypto.randomUUID(),
          name: displayName,
          email,
          role,
        };
        set({ user, token: fakeJwt({ sub: user.id, role }), isAuthenticated: true });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setRole: (role) => {
        const u = get().user;
        if (!u) return;
        set({ user: { ...u, role }, token: fakeJwt({ sub: u.id, role }) });
      },
    }),
    { name: "aiinsight-auth" }
  )
);

export const roleLabel = (r: Role) =>
  r === "admin" ? "HR Admin" : r === "manager" ? "Manager" : "Employee";