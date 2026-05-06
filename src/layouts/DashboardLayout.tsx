import { useState, createContext, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";

interface LayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({ sidebarOpen: true, setSidebarOpen: () => {} });
export const useLayout = () => useContext(LayoutContext);

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [isMobile]);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex h-screen overflow-hidden bg-background">
        {!isMobile && <AppSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />}
        <AnimatePresence>
          {isMobile && mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed left-0 top-0 z-50 h-full"
              >
                <AppSidebar open={true} onToggle={() => setMobileOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav onMenuClick={isMobile ? () => setMobileOpen(true) : undefined} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
            <Outlet />
          </main>
        </div>
        <FloatingAIAssistant />
      </div>
    </LayoutContext.Provider>
  );
}
