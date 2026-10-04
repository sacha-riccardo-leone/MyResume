import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Standard shadcn/Magic UI class helper: clsx for conditionals, tailwind-merge
   so a later Tailwind class wins over an earlier conflicting one. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
