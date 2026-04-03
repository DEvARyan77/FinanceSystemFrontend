import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const MainLayout = () => {
    return (
        <div className="min-h-screen font-sans bg-[#F4F4F0] text-black selection:bg-black selection:text-[#FFD500] flex flex-col md:flex-row overflow-x-hidden">
            <Sidebar />
            <MobileNav />
            <Outlet />
        </div>
    );
};

export default MainLayout;