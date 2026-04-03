import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Mail, AlertCircle, CheckCircle, Send } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); 
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setStatus('error');
            setMessage('EMAIL IS REQUIRED.');
            return;
        }

        setStatus('loading');
        try {
            const res = await api.post('/users/forgot-password', { email });
            setStatus('success');
            setMessage(res.data.message || 'TEMPORARY PASSWORD SENT TO YOUR EMAIL.');
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.error || 'FAILED TO RESET PASSWORD. PLEASE TRY AGAIN.');
        }
    };

    return (
        <div className="min-h-screen font-sans bg-[#F4F4F0] text-black flex items-center justify-center p-4 selection:bg-black selection:text-[#FFD500]">
            <div className="fixed inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-8">
                    <Link to="/login" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-[#FFD500] px-3 py-2 rounded-lg transition-colors border-2 border-transparent hover:border-black mb-4">
                        <ArrowLeft size={16} strokeWidth={3} /> Back to Login
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase bg-white px-6 py-2 border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000] inline-block w-full">
                        Reset Pass
                    </h1>
                </div>

                <div className="bg-white border-[4px] border-black rounded-3xl p-6 md:p-8 shadow-[12px_12px_0_0_#FFD500]">
                    
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center text-center py-6">
                            <div className="w-16 h-16 bg-[#00FF44] border-[4px] border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0_0_#000]">
                                <CheckCircle size={32} strokeWidth={3} />
                            </div>
                            <h3 className="font-black uppercase text-xl mb-2">Check Your Inbox</h3>
                            <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest mb-6">
                                {message}
                            </p>
                            <Link to="/login" className="w-full h-14 bg-black text-white rounded-xl border-[4px] border-black font-black uppercase tracking-widest flex items-center justify-center hover:bg-[#FFD500] hover:text-black transition-colors shadow-[6px_6px_0_0_#000]">
                                Return to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-l-[3px] border-[#FFD500] pl-3">
                                Enter your email address. If an account exists, we will generate a secure temporary password and mail it to you.
                            </p>

                            {status === 'error' && (
                                <div className="p-3 bg-[#FF0055] text-white border-[3px] border-black rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                    <AlertCircle size={16} strokeWidth={3} /> {message}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={14} strokeWidth={3} /> Registered Email
                                </label>
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="OPERATOR@FINANCEBASE.COM"
                                    value={email} 
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if(status === 'error') setStatus('idle'); 
                                    }} 
                                    disabled={status === 'loading'}
                                    className="w-full h-14 px-4 rounded-xl border-[4px] border-black font-black uppercase bg-[#F4F4F0] focus:bg-white outline-none focus:shadow-[4px_4px_0_0_#FFD500] transition-shadow disabled:opacity-50" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className={`w-full h-14 rounded-xl border-[4px] border-black font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                                    status === 'loading' 
                                        ? 'bg-zinc-300 translate-x-[4px] translate-y-[4px] shadow-none text-zinc-500 cursor-not-allowed' 
                                        : 'bg-[#FFD500] text-black shadow-[6px_6px_0_0_#000] hover:bg-black hover:text-[#FFD500] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'
                                }`}
                            >
                                {status === 'loading' ? 'Transmitting...' : <>Request Reset <Send size={18} strokeWidth={3} /></>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;