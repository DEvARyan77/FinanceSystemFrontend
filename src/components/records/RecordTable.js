import { useState } from "react";
import { Edit2, Trash2, Save, X, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../services/api";

const RecordTable = ({ records, canEdit, canDelete, fetchRecords, pagination, setPagination }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleUpdate = async (id) => {
        try {
            await api.put(`/records/${id}`, editData);
            setEditingId(null);
            fetchRecords();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update record.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('CONFIRM DELETION OF RECORD?')) {
            try {
                await api.delete(`/records/${id}`);
                fetchRecords();
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to delete record.');
            }
        }
    };

    return (
        <section className="bg-white rounded-3xl border-[4px] border-black shadow-[8px_8px_0_0_#000] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-black text-white text-xs font-black uppercase tracking-widest">
                            <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Date</th>
                            <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Category</th>
                            <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Type</th>
                            <th className="p-4 border-b-[4px] border-black whitespace-nowrap">Amount</th>
                            <th className="p-4 border-b-[4px] border-black w-full">Description</th>
                            <th className="p-4 border-b-[4px] border-black text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? records.map((record) => (
                            <tr key={record.id} className="border-b-[3px] border-black last:border-b-0 hover:bg-[#F4F4F0] transition-colors group">
                                {editingId === record.id ? (
                                    <>
                                        <td className="p-3">
                                            <input 
                                                type="date" 
                                                value={editData.date || record.date.split('T')[0]} 
                                                onChange={(e) => setEditData({...editData, date: e.target.value})} 
                                                className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold outline-none focus:shadow-[2px_2px_0_0_#FFD500]" 
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input type="text" value={editData.category || record.category} onChange={(e) => setEditData({...editData, category: e.target.value})} className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold uppercase outline-none focus:shadow-[2px_2px_0_0_#FFD500]" />
                                        </td>
                                        <td className="p-3">
                                            <select value={editData.type || record.type} onChange={(e) => setEditData({...editData, type: e.target.value})} className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold uppercase outline-none focus:shadow-[2px_2px_0_0_#FFD500] cursor-pointer">
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                            </select>
                                        </td>
                                        <td className="p-3">
                                            <input type="number" value={editData.amount || record.amount} onChange={(e) => setEditData({...editData, amount: e.target.value})} className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold outline-none focus:shadow-[2px_2px_0_0_#FFD500]" />
                                        </td>
                                        <td className="p-3">
                                            <input type="text" value={editData.description || record.description} onChange={(e) => setEditData({...editData, description: e.target.value})} className="w-full h-10 px-2 rounded-lg border-2 border-black font-bold outline-none focus:shadow-[2px_2px_0_0_#FFD500]" />
                                        </td>
                                        <td className="p-3 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleUpdate(record.id)} className="p-2 bg-[#00FF44] border-2 border-black rounded-lg hover:shadow-[2px_2px_0_0_#000] transition-all" title="Save">
                                                    <Save size={18} strokeWidth={3} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="p-2 bg-white border-2 border-black rounded-lg hover:shadow-[2px_2px_0_0_#000] transition-all" title="Cancel">
                                                    <X size={18} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4 font-bold whitespace-nowrap text-sm">
                                            {new Date(record.date).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="p-4 font-black uppercase text-sm">{record.category}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 border-[2px] border-black rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit ${record.type === 'income' ? 'bg-[#00FF44]' : 'bg-[#FF0055] text-white'}`}>
                                                {record.type === 'income' ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
                                                {record.type}
                                            </span>
                                        </td>
                                        <td className="p-4 font-black text-lg whitespace-nowrap">₹{record.amount.toLocaleString()}</td>
                                        <td className="p-4 font-bold text-zinc-600 text-sm truncate max-w-xs">{record.description || '-'}</td>
                                        <td className="p-4 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                {canEdit && (
                                                    <button onClick={() => { setEditingId(record.id); setEditData({}); }} className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FFD500] hover:shadow-[2px_2px_0_0_#000] transition-all">
                                                        <Edit2 size={16} strokeWidth={3} />
                                                    </button>
                                                )}
                                                {canDelete && (
                                                    <button onClick={() => handleDelete(record.id)} className="p-2 bg-white border-2 border-black rounded-lg hover:bg-[#FF0055] hover:text-white hover:shadow-[2px_2px_0_0_#000] transition-all">
                                                        <Trash2 size={16} strokeWidth={3} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="p-8 text-center font-black uppercase text-zinc-400">
                                    No records match your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-[#FFD500] border-t-[4px] border-black p-4 flex items-center justify-between">
                <button 
                    disabled={pagination.offset === 0} 
                    onClick={() => setPagination({...pagination, offset: Math.max(0, pagination.offset - pagination.limit)})}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-black rounded-xl font-black uppercase text-xs shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                    <ChevronLeft size={16} strokeWidth={3} /> Prev
                </button>
                
                <span className="font-black uppercase tracking-widest text-xs bg-black text-[#FFD500] px-4 py-2 rounded-xl border-[3px] border-black shadow-[3px_3px_0_0_#FFF]">
                    Page {Math.floor(pagination.offset / pagination.limit) + 1} / {Math.max(1, pagination.pages)}
                </span>
                
                <button 
                    disabled={pagination.offset + pagination.limit >= pagination.total} 
                    onClick={() => setPagination({...pagination, offset: pagination.offset + pagination.limit})}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-black rounded-xl font-black uppercase text-xs shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                    Next <ChevronRight size={16} strokeWidth={3} />
                </button>
            </div>
        </section>
    );
};

export default RecordTable;