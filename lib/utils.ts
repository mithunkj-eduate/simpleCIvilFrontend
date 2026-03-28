import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string, unit?: string) {
  return unit ? `${price}/${unit}` : price;
}

export function getWhatsAppLink(phone: string, message?: string) {
  const clean = phone.replace(/\D/g, "");
  const msg = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${clean}${msg ? `?text=${msg}` : ""}`;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
