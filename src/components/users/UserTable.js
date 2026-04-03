import { useState } from "react";
import { UsersIcon, ShieldCheck, UserCircle, Edit2, Trash2, Save, X, UserPlus } from "lucide-react";
import api from "../../services/api";

const UserTable = ({ users, currentUser, fetchUsers, showNotification, onAddClick }) => {
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleUpdate = async (id) => {
    try {
      await api.put(`/users/${id}`, editForm);
      setEditing(null);
      showNotification("USER UPDATED SUCCESSFULLY. ✅");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update user.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("CONFIRM DELETION OF USER? THIS CANNOT BE UNDONE.")) {
      try {
        await api.delete(`/users/${id}`);
        showNotification("USER DELETED. 🗑️");
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete user.");
      }
    }
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "admin": return "bg-[#FF0055] text-white border-black";
      case "analyst": return "bg-[#FFD500] text-black border-black";
      default: return "bg-white text-black border-black";
    }
  };

  return (
    <section className="bg-white rounded-3xl border-[4px] border-black shadow-[8px_8px_0_0_#000] overflow-hidden mt-8">
      <div className="p-6 border-b-[4px] border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#F4F4F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0_0_#FFD500]">
            <UsersIcon className="text-white" size={20} strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">System Users</h2>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-[#FFD500] text-black px-4 py-2 rounded-xl border-[3px] border-black font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-[#FFD500] hover:shadow-[6px_6px_0_0_#FFD500] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
        >
          <UserPlus size={18} strokeWidth={3} /> Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-black text-white text-xs font-black uppercase tracking-widest">
              <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Identity</th>
              <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Communications</th>
              <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Clearance Level</th>
              <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Status</th>
              <th className="p-4 border-b-[4px] border-black text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b-[3px] border-black last:border-b-0 hover:bg-[#F4F4F0] transition-colors group">
                  {editing === user.id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.name ?? user.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold uppercase outline-none focus:shadow-[2px_2px_0_0_#FFD500]"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="email"
                          value={editForm.email ?? user.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold uppercase outline-none focus:shadow-[2px_2px_0_0_#FFD500]"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editForm.role ?? user.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold uppercase outline-none focus:shadow-[2px_2px_0_0_#FFD500] cursor-pointer"
                        >
                          <option value="viewer">Viewer</option>
                          <option value="analyst">Analyst</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <select
                          value={editForm.status ?? user.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold uppercase outline-none focus:shadow-[2px_2px_0_0_#FFD500] cursor-pointer"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleUpdate(user.id)} className="p-2 bg-[#00FF44] border-2 border-black rounded-lg hover:shadow-[2px_2px_0_0_#000] transition-all" title="Save">
                            <Save size={18} strokeWidth={3} />
                          </button>
                          <button onClick={() => setEditing(null)} className="p-2 bg-white border-2 border-black rounded-lg hover:shadow-[2px_2px_0_0_#000] transition-all" title="Cancel">
                            <X size={18} strokeWidth={3} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F4F4F0] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                            <UserCircle size={16} strokeWidth={2.5} />
                          </div>
                          <span className="font-black uppercase text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-zinc-600 text-sm whitespace-nowrap">{user.email}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-3 py-1 border-[2px] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit ${getRoleStyle(user.role)}`}>
                          {user.role === "admin" && <ShieldCheck size={12} strokeWidth={3} />} {user.role}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 border-black ${user.status === "active" ? "bg-[#00FF44]" : "bg-[#FF0055]"}`}></div>
                          <span className="font-black uppercase text-xs tracking-widest">{user.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {currentUser?.id !== user.id ? (
                          <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditing(user.id);
                                setEditForm({});
                              }}
                              className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FFD500] hover:shadow-[2px_2px_0_0_#000] transition-all"
                            >
                              <Edit2 size={16} strokeWidth={3} />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FF0055] hover:text-white hover:shadow-[2px_2px_0_0_#000] transition-all"
                            >
                              <Trash2 size={16} strokeWidth={3} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pr-2">Current User</span>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center font-black uppercase text-zinc-400">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTable;