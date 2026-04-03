import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRightIcon, User, Mail, Lock, ShieldCheck, EyeIcon, TrendingUp, ChevronDown } from "lucide-react";
import AuthLayout from '../components/layout/AuthLayout';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'viewer' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const dropdownRef = useRef(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const roles = [
        { id: 'viewer', label: 'Viewer', desc: 'Read-only access', icon: EyeIcon },
        { id: 'analyst', label: 'Analyst', desc: 'Strategic creation', icon: TrendingUp },
        { id: 'admin', label: 'Admin', desc: 'Full system control', icon: ShieldCheck },
    ];
    const currentRole = roles.find(r => r.id === form.role);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const selectRole = (roleId) => { setForm({ ...form, role: roleId }); setIsDropdownOpen(false); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await register(form);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            visualTitle="Join the system." 
            visualHighlight="Start today."
        >
            <div className="text-left mb-6 group">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic transition-transform duration-300 group-hover:translate-x-1">Register</h2>
                <div className="h-2 w-20 bg-[#FFD500] border-[3px] border-black mt-2 shadow-[3px_3px_0_0_#000] transition-all duration-300 group-hover:w-24"></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5 group/input">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-4 z-20 pointer-events-none group-focus-within/input:-translate-y-1 transition-transform duration-300">
                            <User className="h-5 w-5 text-zinc-400 group-focus-within/input:text-black" strokeWidth={2.5} />
                        </div>
                        <input
                            name="name" type="text" placeholder="JOHN DOE" required disabled={isLoading}
                            value={form.name} onChange={handleChange}
                            className="w-full pl-12 pr-4 h-12 bg-white border-[3px] border-black text-black font-bold placeholder:text-zinc-300 outline-none transition-all duration-300 shadow-[4px_4px_0_0_#000] focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#FFD500] disabled:opacity-50 uppercase"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 group/input">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-4 z-20 pointer-events-none group-focus-within/input:-translate-y-1 transition-transform duration-300">
                            <Mail className="h-5 w-5 text-zinc-400 group-focus-within/input:text-black" strokeWidth={2.5} />
                        </div>
                        <input
                            name="email" type="email" placeholder="NAME@COMPANY.COM" required disabled={isLoading}
                            value={form.email} onChange={handleChange}
                            className="w-full pl-12 pr-4 h-12 bg-white border-[3px] border-black text-black font-bold placeholder:text-zinc-300 outline-none transition-all duration-300 shadow-[4px_4px_0_0_#000] focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#FFD500] disabled:opacity-50 uppercase"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 group/input">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Password</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-4 z-20 pointer-events-none group-focus-within/input:-translate-y-1 transition-transform duration-300">
                            <Lock className="h-5 w-5 text-zinc-400 group-focus-within/input:text-black" strokeWidth={2.5} />
                        </div>
                        <input
                            name="password" type="password" placeholder="••••••••" required disabled={isLoading}
                            value={form.password} onChange={handleChange}
                            className="w-full pl-12 pr-4 h-12 bg-white border-[3px] border-black text-black font-bold placeholder:text-zinc-300 outline-none transition-all duration-300 shadow-[4px_4px_0_0_#000] focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#FFD500] disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="space-y-1.5" ref={dropdownRef}>
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Account Role</label>
                    <div className="relative group/input">
                        <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full flex items-center h-12 pl-4 pr-3 bg-white border-[3px] border-black transition-all duration-300 shadow-[4px_4px_0_0_#000] ${isDropdownOpen ? '-translate-y-1 shadow-[6px_6px_0_0_#FFD500]' : ''}`}>
                            <currentRole.icon className="h-5 w-5 text-black mr-3" strokeWidth={2.5} />
                            <span className="flex-1 text-left font-bold text-sm uppercase">{currentRole.label}</span>
                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white border-[3px] border-black shadow-[6px_6px_0_0_#000] z-50 animate-entrance">
                                {roles.map((role) => (
                                    <div key={role.id} onClick={() => selectRole(role.id)} className="flex items-center px-4 py-3 cursor-pointer hover:bg-[#FFD500] border-b-[2px] last:border-b-0 border-black transition-colors">
                                        <role.icon className="h-5 w-5 mr-3 text-black" strokeWidth={2.5} />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black uppercase text-black">{role.label}</span>
                                            <span className="text-[10px] text-black/70 uppercase font-bold tracking-widest">{role.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {error && <div className="p-3 border-[3px] border-black bg-[#FF0055] text-white font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#000]">! {error}</div>}

                <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center h-14 border-[3px] border-black text-black font-black uppercase tracking-widest transition-all duration-200 mt-6 group ${isLoading ? 'bg-zinc-200 translate-x-[4px] translate-y-[4px] shadow-none cursor-not-allowed' : 'bg-[#FFD500] shadow-[6px_6px_0_0_#000] hover:bg-black hover:text-[#FFD500] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'}`}>
                    {isLoading ? <span className="animate-pulse">Registering...</span> : <>Complete Registration <ArrowRightIcon className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} /></>}
                </button>
            </form>

            <div className="mt-8 border-t-[3px] border-zinc-200 pt-6 text-center text-xs font-black text-zinc-500 uppercase tracking-widest">
                Already registered? <Link to="/login" className="text-black ml-2 px-2 py-1 transition-colors border-[3px] border-transparent hover:border-black hover:bg-[#FFD500]">Login</Link>
            </div>
        </AuthLayout>
    );
}