import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "8801767678562";
  const message = encodeURIComponent("আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইট থেকে জানতে চাই...");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label="WhatsApp এ যোগাযোগ করুন"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
