import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "orange";
}

export default function Badge({ children, color = "blue" }: BadgeProps) {
  return (
    <span className={clsx(
      "text-xs font-semibold px-2 py-1 rounded-lg uppercase",
      color === "blue"   && "bg-primary-50 text-primary-600",
      color === "green"  && "bg-green-50 text-green-600",
      color === "orange" && "bg-orange-50 text-orange-600",
    )}>
      {children}
    </span>
  );
}
