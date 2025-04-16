
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Package, 
  FileText, 
  ShoppingCart, 
  Pencil, 
  Home,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/", 
      icon: Home,
      color: "text-primary-foreground"
    },
    { 
      name: "Customer Management", 
      path: "/customers", 
      icon: Users,
      color: "text-customer-light"
    },
    { 
      name: "Product Management", 
      path: "/products", 
      icon: Package,
      color: "text-product-light"
    },
    { 
      name: "Quotation Management", 
      path: "/quotations", 
      icon: FileText,
      color: "text-quotation-light"
    },
    { 
      name: "Procurement Workflow", 
      path: "/procurement", 
      icon: ShoppingCart,
      color: "text-procurement-light"
    },
    { 
      name: "Design Workflow", 
      path: "/design", 
      icon: Pencil,
      color: "text-design-light"
    },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "bg-sidebar h-screen transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-sidebar-foreground font-bold text-lg">
            Path Nexus
          </span>
        )}
        <button onClick={toggleSidebar} className="text-sidebar-foreground p-1 rounded-md hover:bg-sidebar-accent">
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md transition-colors",
                  collapsed ? "justify-center" : "justify-start",
                  location.pathname === item.path
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  collapsed ? "mr-0" : "mr-2", 
                  item.color
                )} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border text-center">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/70">
            Product Path Nexus v1.0
          </div>
        )}
      </div>
    </div>
  );
}
