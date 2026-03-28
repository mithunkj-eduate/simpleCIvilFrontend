import { getWhatsAppLink } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface WhatsAppFABProps {
  phone: string;
  name: string;
}

export default function WhatsAppFAB({ phone, name }: WhatsAppFABProps) {
  const href = getWhatsAppLink(phone, `Hello ${name}, I'd like to enquire about your services.`);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="text-white" fill="white" />
    </a>
  );
}
