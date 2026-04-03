import { Link } from "react-router-dom";
import { Activity, ArrowUpRight, ArrowDownRight, Edit2, Trash2 } from "lucide-react";

const RecentLedger = ({ recent, canCreate, canDelete, onEdit, onDelete }) => {
    return (
        <section className="bg-white rounded-3xl border-[4px] border-black p-4 md:p-6 shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-xl border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0_0_#FFD500]">
                        <Activity className="text-white" size={20} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Recent Ledger</h2>
                </div>
                <Link to="/records" className="text-xs font-black uppercase underline hover:text-[#FFD500]">View All</Link>
            </div>
            
            {recent.length > 0 ? (
                <ul className="space-y-4">
                    {recent.map((r) => (
                        <li key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-[3px] border-black bg-[#F4F4F0] hover:bg-white transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`min-w-[48px] h-12 rounded-full flex items-center justify-center border-[3px] border-black shadow-[2px_2px_0_0_#000] ${r.type === 'income' ? 'bg-[#00FF44]' : 'bg-[#FF0055]'}`}>
                                    {r.type === 'income' ? <ArrowUpRight strokeWidth={3} /> : <ArrowDownRight strokeWidth={3} />}
                                </div>
                                <div>
                                    <div className="font-black text-lg uppercase leading-tight">{r.category}</div>
                                    <div className="text-xs font-bold text-zinc-500">{new Date(r.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0 gap-4">
                                <div className="text-left sm:text-right">
                                    <div className="text-xl font-black">₹{r.amount.toLocaleString()}</div>
                                    <div className={`text-[10px] font-black uppercase tracking-widest ${r.type === 'income' ? 'text-[#00FF44]' : 'text-[#FF0055]'}`}>
                                        {r.type}
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                    {canCreate && (
                                        <button onClick={() => onEdit(r)} className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FFD500] hover:shadow-[2px_2px_0_0_#000] transition-all">
                                            <Edit2 size={16} strokeWidth={2.5} />
                                        </button>
                                    )}
                                    {canDelete && (
                                        <button onClick={() => onDelete(r.id)} className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FF0055] hover:text-white hover:shadow-[2px_2px_0_0_#000] transition-all">
                                            <Trash2 size={16} strokeWidth={2.5} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-8 text-center font-black uppercase text-zinc-400 border-[3px] border-dashed border-black rounded-2xl">
                    No recent transactions.
                </div>
            )}
        </section>
    );
};

export default RecentLedger;