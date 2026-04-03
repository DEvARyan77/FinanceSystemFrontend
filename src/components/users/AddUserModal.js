import { useState } from "react";
import { X, Send } from "lucide-react";
import api from "../../services/api";

const AddUserModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: "", email: "", role: "viewer" });

  if (!isOpen) return null;

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/users", newUserForm);
      onSuccess("USER CREATED. CREDENTIALS EMAILED. ✅");
      setNewUserForm({ name: "", email: "", role: "viewer" });
      onClose();
    } catch (err) {
      onError(err.response?.data?.error || "FAILED TO CREATE USER. ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border-[4px] border-black rounded-3xl p-6 w-full max-w-sm shadow-[12px_12px_0_0_#FFD500]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black uppercase">Create User</h3>
          <button onClick={onClose} className="p-2 border-[3px] border-black rounded-xl hover:bg-[#FF0055] hover:text-white transition-colors">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-l-[3px] border-[#FFD500] pl-3">
          A secure temporary password will be automatically generated and emailed to the user.
        </p>

        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Full Name</label>
            <input
              type="text" required placeholder="JOHN DOE"
              value={newUserForm.name}
              onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border-[3px] border-black font-black uppercase bg-[#F4F4F0] focus:bg-white outline-none focus:shadow-[4px_4px_0_0_#FFD500]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Email Address</label>
            <input
              type="email" required placeholder="USER@COMPANY.COM"
              value={newUserForm.email}
              onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border-[3px] border-black font-black uppercase bg-[#F4F4F0] focus:bg-white outline-none focus:shadow-[4px_4px_0_0_#FFD500]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest">Clearance Role</label>
            <select
              value={newUserForm.role}
              onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
              className="w-full h-12 px-3 rounded-xl border-[3px] border-black font-black uppercase bg-[#F4F4F0] focus:bg-white cursor-pointer outline-none focus:shadow-[4px_4px_0_0_#FFD500] appearance-none"
            >
              <option value="viewer">Viewer (Read Only)</option>
              <option value="analyst">Analyst (Data Entry)</option>
              <option value="admin">Admin (Full Access)</option>
            </select>
          </div>

          <button
            type="submit" disabled={isLoading}
            className={`w-full h-14 mt-6 rounded-xl border-[4px] border-black font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              isLoading ? "bg-zinc-300 translate-x-[4px] translate-y-[4px] shadow-none text-zinc-500" : "bg-[#FFD500] text-black shadow-[6px_6px_0_0_#000] hover:bg-black hover:text-[#FFD500] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
            }`}
          >
            {isLoading ? "Generating..." : <>Dispatch Credentials <Send size={18} strokeWidth={3} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;