
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
  color: string;
  actions?: {
    label: string;
    onClick?: () => void;
    href?: string;
  }[];
  className?: string;
}

export function ModuleCard({ 
  title, 
  description, 
  icon, 
  linkTo,
  color,
  actions,
  className
}: ModuleCardProps) {
  return (
    <div className={cn("module-card", className)}>
      <div className="module-card-header">
        <div className={cn("p-2 rounded-full", color)}>
          {icon}
        </div>
        <Link 
          to={linkTo}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowRight size={18} />
        </Link>
      </div>
      
      <h3 className="module-card-title">{title}</h3>
      <p className="module-card-description">{description}</p>
      
      {actions && actions.length > 0 && (
        <div className="module-card-actions">
          {actions.map((action, index) => (
            action.href ? (
              <Link 
                key={index} 
                to={action.href}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {action.label}
              </Link>
            ) : (
              <Button key={index} onClick={action.onClick}>
                {action.label}
              </Button>
            )
          ))}
        </div>
      )}
    </div>
  );
}
