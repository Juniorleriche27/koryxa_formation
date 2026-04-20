import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  loading?: boolean;
}

export default function Button({ variant = "primary", loading, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50",
        variant === "primary" && "bg-primary-600 text-white hover:bg-primary-700",
        variant === "outline" && "border border-primary-600 text-primary-600 hover:bg-primary-50",
        variant === "ghost"   && "text-slate-600 hover:bg-slate-100",
        className
      )}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}
