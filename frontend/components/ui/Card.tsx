import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "glass";
}

export default function Card({ children, className, variant = "light" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl p-5 sm:p-6",
        variant === "light" && "border border-slate-200 bg-white shadow-sm",
        variant === "dark" && "border border-white/10 bg-slate-950 text-white shadow-2xl shadow-slate-950/30",
        variant === "glass" && "border border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
