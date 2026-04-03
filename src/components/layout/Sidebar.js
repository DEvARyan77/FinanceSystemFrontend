import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Receipt, Users as UsersIcon, LogOut } from "lucide-react";

const Sidebar = () => {
  const { user: currentUser } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname.startsWith(path);
    const baseStyle = "flex items-center px-3 py-3 border-[4px] rounded-2xl transition-all whitespace-nowrap";
    const activeStyle = "bg-black text-[#FFD500] border-black shadow-[4px_4px_0_0_#FFD500]";
    const inactiveStyle = "bg-white text-black border-transparent hover:border-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-1";

    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-20 hover:w-72 bg-white border-r-[4px] border-black transition-all duration-300 ease-in-out z-40 group flex-col shadow-[4px_0_0_0_#000] overflow-hidden">
      <div className="h-24 min-h-[96px] flex items-center px-4 border-b-[4px] border-black bg-[#FFD500]">
        <div className="min-w-[44px] h-12 bg-white border-[4px] border-black rounded-xl shadow-[4px_4px_0_0_#000] flex items-center justify-center font-black text-2xl text-black">
          F
        </div>
        <span className="ml-4 font-black text-2xl uppercase tracking-tighter whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          FinanceBase
        </span>
      </div>

      <div className="flex-1 py-6 px-3 flex flex-col gap-4">
        <Link to="/dashboard" className={getLinkStyle('/dashboard')}>
          <LayoutDashboard size={24} strokeWidth={3} className="min-w-[24px]" />
          <span className="ml-4 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
        </Link>
        
        <Link to="/records" className={getLinkStyle('/records')}>
          <Receipt size={24} strokeWidth={3} className="min-w-[24px]" />
          <span className="ml-4 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Records</span>
        </Link>

        {currentUser?.role === 'admin' && (
          <Link to="/users" className={getLinkStyle('/users')}>
            <UsersIcon size={24} strokeWidth={3} className="min-w-[24px]" />
            <span className="ml-4 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Users</span>
          </Link>
        )}
      </div>

      <div className="p-4 border-t-[4px] border-black bg-white">
        <div className="flex items-center px-2 mb-4 whitespace-nowrap">
          <div className="min-w-[40px] h-10 bg-[#FFD500] rounded-full border-[3px] border-black flex items-center justify-center text-black font-black text-lg">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
            <div className="font-black text-sm uppercase max-w-[140px] truncate">{currentUser?.name || "Operator"}</div>
            <div>
              <span className="text-[10px] font-black text-white uppercase bg-black px-2 py-0.5 rounded-full inline-block mt-0.5">
                {currentUser?.role}
              </span>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center w-full px-3 py-3 bg-white text-[#FF0055] border-[4px] border-transparent hover:border-black rounded-2xl hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-all whitespace-nowrap">
          <LogOut size={24} strokeWidth={3} className="min-w-[24px]" />
          <span className="ml-4 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;