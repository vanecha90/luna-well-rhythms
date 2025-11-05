import { Home, Calendar, Activity, Apple, Moon, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/cycle", icon: Calendar, label: "Cycle" },
  { to: "/fitness", icon: Activity, label: "Fitness" },
  { to: "/nutrition", icon: Apple, label: "Nutrition" },
  { to: "/moon", icon: Moon, label: "Moon" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomNav() {
  const { user } = useAuth();
  const location = useLocation();

  // Don't show nav on auth page or if user is not logged in
  if (!user || location.pathname === "/auth") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors"
            activeClassName="text-primary bg-muted"
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
