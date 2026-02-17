import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Server, 
  GitCompare, 
  CalendarClock, 
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  PlayCircle,
  Calculator as CalculatorIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const navItems = [
  { href: "/", label: "Обзор проекта", icon: LayoutDashboard },
  { href: "/variants", label: "Сравнение вариантов", icon: GitCompare },
  { href: "/specs", label: "Спецификации", icon: Server },
  { href: "/calculator", label: "Калькулятор", icon: CalculatorIcon },
  { href: "/vendors", label: "Вендоры", icon: Building2 },
  { href: "/roadmap", label: "План внедрения", icon: CalendarClock },
  { href: "/risks", label: "Риски и KPI", icon: FileText },
  { href: "/demo", label: "Демонстрация", icon: PlayCircle },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "[") {
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="font-mono font-bold text-xl tracking-tighter text-primary">
          AZONE AI.AGENT
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border transform transition-all duration-300 ease-in-out flex flex-col shrink-0",
        // Mobile styles: hidden by default (translate-x-full), shown when open
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop styles: always visible (translate-x-0), fixed position
        "md:translate-x-0",
        // Width control
        isCollapsed ? "w-64 md:w-20" : "w-64"
      )}>
        <div className={cn("p-6 border-b border-sidebar-border flex items-center justify-between", isCollapsed && "px-4 justify-center")}>
          {!isCollapsed && (
            <div>
              <div className="font-mono font-bold text-2xl tracking-tighter text-primary whitespace-nowrap overflow-hidden">
                AZONE AI
              </div>
              <div className="text-xs text-muted-foreground mt-2 font-mono whitespace-nowrap overflow-hidden">
                v3.0 // CENTRALIZED
              </div>
            </div>
          )}
          {isCollapsed && (
             <div className="font-mono font-bold text-xl tracking-tighter text-primary">
               AI
             </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            const LinkContent = (
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-none border border-transparent transition-all duration-200 cursor-pointer group",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                  : "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:border-sidebar-border",
                isCollapsed && "justify-center px-2"
              )}>
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!isCollapsed && (
                  <span className="font-medium tracking-tight whitespace-nowrap overflow-hidden transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
                {isActive && !isCollapsed && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
              </div>
            );

            return (
              <Link key={item.href} href={item.href}>
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {LinkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-mono">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  LinkContent
                )}
              </Link>
            );
          })}
        </nav>

        <div className={cn("p-4 border-t border-sidebar-border bg-sidebar-accent/20", isCollapsed && "flex justify-center")}>
          {!isCollapsed ? (
            <>
              <div className="text-xs font-mono text-muted-foreground mb-2">STATUS:</div>
              <div className="flex items-center gap-2 text-sm font-bold text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                READY
              </div>
            </>
          ) : (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="READY" />
          )}
        </div>

        {/* Collapse Toggle Button (Desktop Only) */}
        <div className="hidden md:flex justify-end p-2 border-t border-sidebar-border">
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full h-8 hover:bg-sidebar-accent text-muted-foreground hover:text-foreground"
            title="Press '[' to toggle"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 overflow-x-hidden transition-all duration-300 min-h-screen",
          // Add margin on desktop to account for fixed sidebar
          isCollapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        <div className="container py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
