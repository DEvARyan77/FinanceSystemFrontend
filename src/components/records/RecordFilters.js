import { Search, Filter, X } from "lucide-react";

const RecordFilters = ({ filters, setFilters }) => {
    const handleDateBlur = (field, rawValue) => {
        if (!rawValue) return;
        
        const parts = rawValue.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            if (year && year.length === 4 && year.startsWith('00')) {
                const typedYear = parseInt(year.slice(2), 10); 
                const currentYear2Digit = new Date().getFullYear() % 100;
                const centuryPrefix = typedYear > (currentYear2Digit + 10) ? "19" : "20";
                
                const correctedYear = centuryPrefix + year.slice(2);
                const finalValue = `${correctedYear}-${month}-${day}`;
                setFilters({ ...filters, [field]: finalValue });
            }
        }
    };

    return (
        <section className="bg-white rounded-3xl border-[4px] border-black p-6 shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FFD500] rounded-xl border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                    <Filter className="text-black" size={20} strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Data Filters</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Category</label>
                    <div className="relative group">
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-black z-10 pointer-events-none transition-transform group-focus-within:-translate-y-1" strokeWidth={3} />
                        <input 
                            type="text" 
                            placeholder="SEARCH..." 
                            value={filters.category} 
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                            className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-black uppercase outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#FFD500] transition-all relative z-0"
                        />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">Type</label>
                    <select 
                        value={filters.type} 
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                        className="w-full h-12 px-3 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-black uppercase outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#FFD500] transition-all cursor-pointer appearance-none"
                    >
                        <option value="">All Types</option>
                        <option value="income">Income (+)</option>
                        <option value="expense">Expense (-)</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">From Date</label>
                    <input 
                        type="date" 
                        value={filters.from} 
                        onChange={(e) => setFilters({...filters, from: e.target.value})}
                        onBlur={(e) => handleDateBlur('from', e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-black uppercase outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#FFD500] transition-all cursor-pointer"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 pl-1">To Date</label>
                    <input 
                        type="date" 
                        value={filters.to} 
                        onChange={(e) => setFilters({...filters, to: e.target.value})}
                        onBlur={(e) => handleDateBlur('to', e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#F4F4F0] border-[3px] border-black font-black uppercase outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0_0_#FFD500] transition-all cursor-pointer"
                    />
                </div>

                <button 
                    onClick={() => setFilters({ type: '', category: '', from: '', to: '' })}
                    className="w-full h-12 rounded-xl bg-black text-white border-[3px] border-black font-black uppercase tracking-widest hover:bg-[#FF0055] hover:border-[#FF0055] shadow-[4px_4px_0_0_#FFD500] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                    <X size={18} strokeWidth={3} /> Clear
                </button>
            </div>
        </section>
    );
};

export default RecordFilters;