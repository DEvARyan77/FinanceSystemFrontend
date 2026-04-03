import { Plus } from "lucide-react";

const QuickLogForm = ({ newRecord, setNewRecord, handleCreate, isSubmitting, message }) => {
    return (
        <div className="sticky top-6 bg-white rounded-3xl border-[4px] border-black p-5 shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center gap-3 mb-6 border-b-[4px] border-black pb-4">
                <div className="w-10 h-10 bg-black rounded-full border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0_0_#FFD500]">
                    <Plus className="text-white" size={20} strokeWidth={4} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter">Quick Log</h2>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-xl border-[3px] border-black font-black text-[10px] tracking-widest uppercase shadow-[4px_4px_0_0_#000] ${message.includes('SUCCESS') ? 'bg-[#00FF44] text-black' : 'bg-[#FF0055] text-white'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Amount (₹)</label>
                    <input 
                        type="number" required
                        value={newRecord.amount} 
                        onChange={(e) => setNewRecord({...newRecord, amount: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-black text-lg outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#000] transition-all" 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Type</label>
                    <select 
                        value={newRecord.type} 
                        onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                        className="w-full h-12 px-3 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-black uppercase outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#000] transition-all cursor-pointer appearance-none"
                    >
                        <option value="income">Income (+)</option>
                        <option value="expense">Expense (-)</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Category</label>
                    <input 
                        type="text" required placeholder="e.g. Software, Salary"
                        value={newRecord.category} 
                        onChange={(e) => setNewRecord({...newRecord, category: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-bold outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#000] transition-all" 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Date</label>
                    <input 
                        type="date" required
                        value={newRecord.date} 
                        onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-bold outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#000] transition-all cursor-pointer" 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Description</label>
                    <input 
                        type="text" placeholder="Notes..."
                        value={newRecord.description} 
                        onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-bold outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#000] transition-all" 
                    />
                </div>

                <button 
                    type="submit" disabled={isSubmitting}
                    className={`w-full h-14 mt-4 rounded-xl border-[4px] border-black font-black uppercase tracking-widest transition-all ${
                        isSubmitting 
                            ? 'bg-zinc-300 translate-x-[4px] translate-y-[4px] shadow-none text-zinc-500' 
                            : 'bg-[#FFD500] text-black shadow-[6px_6px_0_0_#000] hover:bg-black hover:text-[#FFD500] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'
                    }`}
                >
                    {isSubmitting ? 'Saving...' : 'Add Record'}
                </button>
            </form>
        </div>
    );
};

export default QuickLogForm;