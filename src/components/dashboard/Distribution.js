import { PieChart } from "lucide-react";

const Distribution = ({ categories }) => {
    const groupedCategories = Object.entries(
        categories.reduce((acc, curr) => {
            const catName = curr.category.toUpperCase();
            if (!acc[catName]) acc[catName] = { income: 0, expense: 0, net: 0 };
            
            if (curr.type === 'income') {
                acc[catName].income += Number(curr.total);
                acc[catName].net += Number(curr.total);
            } else {
                acc[catName].expense += Number(curr.total);
                acc[catName].net -= Number(curr.total);
            }
            return acc;
        }, {})
    )
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => Math.abs(b.net) - Math.abs(a.net)); 

    return (
        <section className="bg-white rounded-3xl border-[4px] border-black p-4 md:p-6 shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FFD500] rounded-xl border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                    <PieChart className="text-black" size={20} strokeWidth={3} />
                </div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Distribution</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
                {groupedCategories.length > 0 ? (
                    groupedCategories.map((c, i) => (
                        <div key={i} className="flex-1 min-w-[150px] bg-[#F4F4F0] border-[3px] border-black rounded-2xl p-4 shadow-[4px_4px_0_0_#000] flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`min-w-[12px] h-3 rounded-full border-[2px] border-black ${c.net >= 0 ? 'bg-[#00FF44]' : 'bg-[#FF0055]'}`}></div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 truncate" title={c.category}>{c.category}</div>
                            </div>
                            <div className="text-2xl font-black mb-1">
                                {c.net < 0 ? '-' : ''}₹{Math.abs(c.net).toLocaleString()}
                            </div>
                            
                            {(c.income > 0 && c.expense > 0) && (
                                <div className="flex items-center justify-between mt-2 pt-2 border-t-[2px] border-black/10 text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-[#00FF44]">IN: {c.income}</span>
                                    <span className="text-[#FF0055]">EX: {c.expense}</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center font-black uppercase text-zinc-400">No data available.</div>
                )}
            </div>
        </section>
    );
};

export default Distribution;