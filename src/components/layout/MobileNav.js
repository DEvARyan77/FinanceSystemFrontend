import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Receipt, Users as UsersIcon, LogOut } from "lucide-react";

const MobileNav = () => {
  const { user: currentUser } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getMobileStyle = (path) => {
    const isActive = location.pathname.startsWith(path);
    return isActive 
      ? "flex flex-col items-center text-black bg-[#FFD500] p-2 rounded-xl border-[3px] border-black" 
      : "flex flex-col items-center text-black p-2 hover:bg-zinc-100 rounded-xl transition-colors border-[3px] border-transparent";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-[4px] border-black z-40 flex justify-around items-center p-3 pb-safe shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
      <Link to="/dashboard" className={getMobileStyle('/dashboard')}>
        <LayoutDashboard size={24} strokeWidth={3} />
      </Link>
      
      <Link to="/records" className={getMobileStyle('/records')}>
        <Receipt size={24} strokeWidth={3} />
      </Link>
      
      {currentUser?.role === 'admin' && (
        <Link to="/users" className={getMobileStyle('/users')}>
          <UsersIcon size={24} strokeWidth={3} />
        </Link>
      )}
      
      <button onClick={handleLogout} className="flex flex-col items-center text-[#FF0055] p-2 hover:bg-zinc-100 rounded-xl transition-colors border-[3px] border-transparent">
        <LogOut size={24} strokeWidth={3} />
      </button>
    </nav>
  );
};

export default MobileNav;