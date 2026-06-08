import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        size === "sm" && "h-9 px-3 text-xs",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-sm sm:text-base",
        variant === "primary" && "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-600/30",
        variant === "outline" && "border border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        variant === "danger" && "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100",
        className
      )}
    >
      {loading ? "Chargement…" : children}
    </button>
  );
}
