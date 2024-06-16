import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOrdinalSuffix(day: number): string {
  const j = day % 10;
  const k = day % 100;
  if (j === 1 && k !== 11) {
    return day + "st";
  }
  if (j === 2 && k !== 12) {
    return day + "nd";
  }
  if (j === 3 && k !== 13) {
    return day + "rd";
  }
  return day + "th";
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const;

export function getMonthName(monthNumber: number): typeof MONTH_NAMES[number] | null {
  if (monthNumber < 1 || monthNumber > 12) {
    return null;
  }
  return MONTH_NAMES[monthNumber - 1] ?? null;
}