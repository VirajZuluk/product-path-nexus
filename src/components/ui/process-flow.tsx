
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  status?: "completed" | "current" | "upcoming";
}

interface ProcessFlowProps {
  steps: Step[];
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function ProcessFlow({ 
  steps, 
  direction = "horizontal",
  className 
}: ProcessFlowProps) {
  const isHorizontal = direction === "horizontal";
  
  return (
    <div className={cn(
      "flex gap-2",
      isHorizontal ? "flex-row" : "flex-col",
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = step.status === "completed";
        const isCurrent = step.status === "current";
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        
        return (
          <div 
            key={step.id}
            className={cn(
              "relative flex",
              isHorizontal ? "flex-col" : "flex-row items-start",
              isHorizontal ? "flex-1" : ""
            )}
          >
            {/* Step connector */}
            {!isFirst && (
              <div 
                className={cn(
                  isHorizontal ? "absolute left-0 top-4 h-0.5 w-full -translate-x-full" : "absolute left-4 top-0 w-0.5 h-full -translate-y-full",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            
            {/* Step indicator */}
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm",
              isHorizontal ? "mx-auto" : "mr-4",
              isCompleted ? "bg-primary text-primary-foreground border-primary" : 
              isCurrent ? "border-primary text-primary" : 
              "border-muted bg-muted/40"
            )}>
              {step.icon || (isCompleted ? "✓" : index + 1)}
            </div>
            
            {/* Step content */}
            <div className={cn(
              "mt-2",
              isHorizontal ? "text-center" : "",
              isHorizontal ? "w-full" : "flex-1"
            )}>
              <h3 className={cn(
                "font-medium",
                isCompleted ? "text-foreground" : 
                isCurrent ? "text-foreground" : 
                "text-muted-foreground"
              )}>
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
