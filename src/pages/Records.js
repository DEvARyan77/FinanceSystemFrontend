import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import RecordFilters from '../components/records/RecordFilters';
import RecordTable from '../components/records/RecordTable';

const Records = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [pagination, setPagination] = useState({ limit: 10, offset: 0, total: 0, pages: 0 });
    const [filters, setFilters] = useState({ type: '', category: '', from: '', to: '' });

    const fetchRecords = async () => {
        const params = { ...filters, limit: pagination.limit, offset: pagination.offset };
        if (user?.role === 'admin') params.all = 'true';
        try {
            const res = await api.get('/records', { params });
            setRecords(res.data.data);
            setPagination(res.data.pagination);
        } catch (err) {
            console.error("Error fetching records:", err);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [filters, pagination.offset, pagination.limit]);

    const canEdit = ['analyst', 'admin'].includes(user?.role);
    const canDelete = user?.role === 'admin';

    return (
        <div className="min-h-screen font-sans bg-[#F4F4F0] text-black selection:bg-black selection:text-[#FFD500] flex flex-col md:flex-row overflow-x-hidden">

            <main className="md:ml-20 flex-1 p-4 md:p-8 lg:p-10 w-full max-w-[1400px] mx-auto pb-24 md:pb-10 relative">
                <div className="fixed inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none z-0" />

                <div className="relative z-10 space-y-8">
                    <header>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase inline-block bg-white px-6 py-2 border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000]">
                            Ledger
                        </h1>
                        <div className="h-2 w-24 bg-[#FFD500] border-[3px] border-black mt-4 shadow-[3px_3px_0_0_#000] rounded-full"></div>
                    </header>
                    <RecordFilters filters={filters} setFilters={setFilters} />

                    <RecordTable 
                        records={records} 
                        canEdit={canEdit} 
                        canDelete={canDelete} 
                        fetchRecords={fetchRecords} 
                        pagination={pagination} 
                        setPagination={setPagination} 
                    />

                </div>
            </main>
        </div>
    );
};

export default Records;