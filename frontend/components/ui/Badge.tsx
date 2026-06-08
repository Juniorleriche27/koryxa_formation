import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "orange" | "slate" | "purple";
  className?: string;
}

export default function Badge({ children, color = "blue", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ring-1",
        color === "blue" && "bg-blue-50 text-blue-700 ring-blue-200",
        color === "green" && "bg-emerald-50 text-emerald-700 ring-emerald-200",
        color === "orange" && "bg-orange-50 text-orange-700 ring-orange-200",
        color === "purple" && "bg-purple-50 text-purple-700 ring-purple-200",
        color === "slate" && "bg-slate-100 text-slate-700 ring-slate-200",
        className
      )}
    >
      {children}
    </span>
  );
}
