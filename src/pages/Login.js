import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRightIcon, EyeIcon, EyeOffIcon, Mail, Lock } from "lucide-react";
import AuthLayout from '../components/layout/AuthLayout';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            visualTitle="Master your data." 
            visualHighlight="Empower finance."
            visualDesc="Automate record keeping, uncover revenue signals, and manage assets securely."
        >
            <div className="text-left mb-6 group">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic transition-transform duration-300 group-hover:translate-x-1">Login</h2>
                <div className="h-2 w-16 bg-[#FFD500] border-[3px] border-black mt-2 shadow-[3px_3px_0_0_#000] transition-all duration-300 group-hover:w-20"></div>
                <p className="mt-3 text-sm font-bold text-zinc-500">Enter your credentials to access the system.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5 group/input">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-4 z-20 pointer-events-none group-focus-within/input:-translate-y-1 transition-transform duration-300">
                            <Mail className="h-5 w-5 text-zinc-400 group-focus-within/input:text-black" strokeWidth={2.5} />
                        </div>
                        <input
                            type="email" placeholder="NAME@COMPANY.COM" required disabled={isLoading}
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 bg-white border-[3px] border-black text-black font-bold placeholder:text-zinc-300 outline-none transition-all duration-300 shadow-[4px_4px_0_0_#000] focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#FFD500] disabled:opacity-50 uppercase"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 group/input">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Password</label>
                        <Link to="/forgot" className="text-xs font-black text-zinc-400 hover:text-black hover:underline uppercase">Forgot It?</Link>
                    </div>
                    <div className="relative flex items-center">
                        <div className="absolute left-4 z-20 pointer-events-none group-focus-within/input:-translate-y-1 transition-transform duration-300">
                            <Lock className="h-5 w-5 text-zinc-400 group-focus-within/input:text-black" strokeWidth={2.5} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"} placeholder="••••••••" required disabled={isLoading}
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-12 h-12 bg-white border-[3px] border-black text-black font-bold placeholder:text-zinc-300 outline-none transition-all duration-300 shadow-[4px_4px_0_0_#000] focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#FFD500] disabled:opacity-50"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 z-20 text-zinc-400 hover:text-black group-focus-within/input:-translate-y-1 transition-transform duration-300 focus:outline-none">
                            {showPassword ? <EyeIcon size={20} strokeWidth={2.5} /> : <EyeOffIcon size={20} strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-3 border-[3px] border-black bg-[#FF0055] text-white font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#000]">! {error}</div>
                )}

                <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center h-14 border-[3px] border-black text-black font-black uppercase tracking-widest transition-all duration-200 mt-6 group ${isLoading ? 'bg-zinc-200 translate-x-[4px] translate-y-[4px] shadow-none cursor-not-allowed' : 'bg-[#FFD500] shadow-[6px_6px_0_0_#000] hover:bg-black hover:text-[#FFD500] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'}`}>
                    {isLoading ? <span className="animate-pulse">Processing...</span> : <>Sign In System <ArrowRightIcon className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} /></>}
                </button>
            </form>

            <div className="mt-8 border-t-[3px] border-zinc-200 pt-6 text-center text-xs font-black text-zinc-500 uppercase tracking-widest">
                No account? <Link to="/register" className="text-black ml-2 px-2 py-1 transition-colors border-[3px] border-transparent hover:border-black hover:bg-[#FFD500]">Register</Link>
            </div>
        </AuthLayout>
    );
}