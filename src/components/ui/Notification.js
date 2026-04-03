import { X } from "lucide-react";

const Notification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-10 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md p-4 border-[4px] border-black rounded-2xl shadow-[8px_8px_0_0_#000] font-black uppercase tracking-widest flex items-center justify-between animate-in fade-in zoom-in duration-300 ${
        message.includes("❌") ? "bg-[#FF0055] text-white" : "bg-[#00FF44] text-black"
      }`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:scale-110 transition-transform">
        <X size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Notification;