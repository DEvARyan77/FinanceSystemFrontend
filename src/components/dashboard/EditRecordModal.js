import { X } from "lucide-react";

const EditRecordModal = ({ editingRecord, setEditingRecord, handleUpdate, editMessage }) => {
    if (!editingRecord) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border-[4px] border-black rounded-3xl p-6 w-full max-w-sm shadow-[12px_12px_0_0_#FFD500] animate-entrance">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black uppercase">Edit Record</h3>
                    <button onClick={() => setEditingRecord(null)} className="p-2 border-[3px] border-black rounded-xl hover:bg-[#FF0055] hover:text-white transition-colors">
                        <X size={20} strokeWidth={3} />
                    </button>
                </div>

                {editMessage && (
                    <div className="mb-4 p-3 rounded-xl border-[3px] border-black font-black text-[10px] tracking-widest uppercase bg-[#00FF44] text-black">
                        {editMessage}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest">Amount</label>
                        <input type="number" required value={editingRecord.amount} onChange={(e) => setEditingRecord({...editingRecord, amount: e.target.value})} className="w-full h-12 px-4 rounded-xl border-[3px] border-black font-black bg-[#F4F4F0] focus:bg-white" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest">Type</label>
                        <select value={editingRecord.type} onChange={(e) => setEditingRecord({...editingRecord, type: e.target.value})} className="w-full h-12 px-3 rounded-xl border-[3px] border-black font-black uppercase bg-[#F4F4F0] focus:bg-white appearance-none">
                            <option value="income">Income (+)</option>
                            <option value="expense">Expense (-)</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest">Category</label>
                        <input type="text" required value={editingRecord.category} onChange={(e) => setEditingRecord({...editingRecord, category: e.target.value})} className="w-full h-12 px-4 rounded-xl border-[3px] border-black font-black uppercase bg-[#F4F4F0] focus:bg-white" />
                    </div>
                    
                    <button type="submit" className="w-full h-12 mt-4 bg-black text-white rounded-xl border-[3px] border-black font-black uppercase tracking-widest shadow-[4px_4px_0_0_#FFD500] hover:translate-y-1 hover:shadow-none transition-all">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditRecordModal;