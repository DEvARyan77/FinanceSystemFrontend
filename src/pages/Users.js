import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert } from "lucide-react";

import Notification from "../components/ui/Notification";
import UserTable from "../components/users/UserTable";
import AddUserModal from "../components/users/AddUserModal";

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <>
      <main className="md:ml-20 flex-1 p-4 md:p-8 lg:p-10 w-full max-w-[1400px] mx-auto pb-24 md:pb-10 relative">
        <div className="fixed inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none z-0" />

        <div className="relative z-10 space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase inline-block bg-white px-6 py-2 border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000]">
                Users
              </h1>
              <div className="h-2 w-32 bg-[#FFD500] border-[3px] border-black mt-4 shadow-[3px_3px_0_0_#000] rounded-full"></div>
            </div>
            <div className="bg-black text-[#FFD500] border-[4px] border-black rounded-xl px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#FFD500] flex items-center gap-2 w-fit">
              <ShieldAlert size={16} strokeWidth={3} /> Admin Privileges Active
            </div>
          </header>

          <UserTable 
            users={users} 
            currentUser={currentUser} 
            fetchUsers={fetchUsers}
            showNotification={showNotification}
            onAddClick={() => setIsAddModalOpen(true)}
          />

        </div>
      </main>

      <Notification message={message} onClose={() => setMessage("")} />

      <AddUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={(msg) => {
          showNotification(msg);
          fetchUsers();
        }}
        onError={showNotification}
      />
    </>
  );
};

export default Users;