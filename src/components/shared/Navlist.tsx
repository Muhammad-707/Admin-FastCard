import { NavLink } from "react-router-dom";
import { Home, ClipboardList, Tag, Folder } from "lucide-react";

interface NavItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { 
    path: "/dashboard", 
    title: "Dashboard", 
    icon: <Home size={20} strokeWidth={2} /> 
  },
  { 
    path: "/orders", 
    title: "Orders", 
    icon: <ClipboardList size={20} strokeWidth={2} />, 
    badge: 0
  },
  { 
    path: "/products", 
    title: "Products", 
    icon: <Tag size={20} strokeWidth={2} /> 
  },
  { 
    path: "/category", 
    title: "Other", 
    icon: <Folder size={20} strokeWidth={2} /> 
  },
];

export default function Navlist() {
  return (
    <nav className="flex flex-col gap-2 w-full select-none">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex items-center justify-between px-4 py-3.5 rounded-lg transition-all text-[15px] font-normal w-full group
            ${isActive 
              ? "bg-white dark:bg-slate-900 dark:text-white text-[#4f566b] shadow-sm font-medium" 
              : "text-gray-300 hover:bg-white/5 hover:text-white"
            }
          `}
        >
          <div className="flex items-center gap-4">
            <span className="shrink-0 transition-colors opacity-90">
              {item.icon}
            </span>
            <span className="tracking-wide">{item.title}</span>
          </div>

          {item.badge !== undefined && (
            <span 
              className="flex h-5 min-w-[24px] items-center justify-center rounded-full bg-[#111827] px-2 text-[12px] font-bold text-white transition-colors"
            >
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}