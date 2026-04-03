import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

const MetricCards = ({ summary }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border-[4px] border-black p-6 shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative overflow-hidden">
                <div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Total Income</div>
                <div className="text-4xl font-black">₹{summary.totalIncome.toLocaleString()}</div>
                <ArrowUpRight className="absolute -bottom-4 -right-4 w-24 h-24 text-[#00FF44] opacity-20" strokeWidth={4} />
            </div>

            <div className="bg-white rounded-3xl border-[4px] border-black p-6 shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative overflow-hidden">
                <div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Total Expenses</div>
                <div className="text-4xl font-black">₹{summary.totalExpenses.toLocaleString()}</div>
                <ArrowDownRight className="absolute -bottom-4 -right-4 w-24 h-24 text-[#FF0055] opacity-20" strokeWidth={4} />
            </div>

            <div className="bg-[#FFD500] rounded-3xl border-[4px] border-black p-6 shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative overflow-hidden">
                <div className="text-xs font-black text-black uppercase tracking-widest mb-2">Net Balance</div>
                <div className="text-4xl font-black">₹{summary.netBalance.toLocaleString()}</div>
                <Wallet className="absolute -bottom-4 -right-4 w-24 h-24 text-black opacity-10" strokeWidth={2} />
            </div>
        </div>
    );
};

export default MetricCards;