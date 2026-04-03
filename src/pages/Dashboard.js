import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import MetricCards from '../components/dashboard/MetricCards';
import RecentLedger from '../components/dashboard/RecentLedger';
import Distribution from '../components/dashboard/Distribution';
import QuickLogForm from '../components/dashboard/QuickLogForm';
import EditRecordModal from '../components/dashboard/EditRecordModal';

const Dashboard = () => {
    const { user } = useAuth();
    
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0 });
    const [categories, setCategories] = useState([]);
    const [recent, setRecent] = useState([]);
    const [systemHealth, setSystemHealth] = useState('Checking...');
    
    const [newRecord, setNewRecord] = useState({ amount: '', type: 'income', category: '', date: '', description: '' });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [editingRecord, setEditingRecord] = useState(null);
    const [editMessage, setEditMessage] = useState('');

    const canCreate = ['analyst', 'admin'].includes(user?.role);
    const canDelete = user?.role === 'admin';

    const fetchData = async () => {
        try {
            api.get('/health').then(() => setSystemHealth('Online')).catch(() => setSystemHealth('Degraded'));

            const [summaryRes, catRes, recentRes] = await Promise.all([
                api.get('/dashboard/summary'),
                api.get('/dashboard/category-totals'),
                api.get('/dashboard/recent?limit=5')
            ]);
            
            setSummary(summaryRes.data);
            setCategories(catRes.data);
            setRecent(recentRes.data);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showNotification = (msg, setter) => {
        setter(msg);
        setTimeout(() => setter(''), 3000);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/records', newRecord);
            showNotification('RECORD LOGGED SUCCESSFULLY. ✅', setMessage);
            setNewRecord({ amount: '', type: 'income', category: '', date: '', description: '' });
            fetchData();
        } catch (err) {
            showNotification(err.response?.data?.error || 'FAILED TO LOG RECORD. ❌', setMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/records/${editingRecord.id}`, {
                amount: Number(editingRecord.amount),
                type: editingRecord.type,
                category: editingRecord.category
            });
            showNotification('RECORD UPDATED. ✅', setEditMessage);
            fetchData();
            setTimeout(() => setEditingRecord(null), 1000);
        } catch (err) {
            showNotification(err.response?.data?.error || 'UPDATE FAILED. ❌', setEditMessage);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("CONFIRM DELETION OF RECORD?")) return;
        try {
            await api.delete(`/records/${id}`);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to delete record.');
        }
    };

    return (
        <div className="min-h-screen w-full flex-1 font-sans bg-[#F4F4F0] text-black selection:bg-black selection:text-[#FFD500] flex flex-col md:flex-row overflow-x-hidden">

            <main className="md:ml-20 flex-1 p-4 md:p-8 lg:p-10 w-full pb-24 md:pb-10 relative">
                <div className="fixed inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none z-0" />

                <div className="relative z-10 space-y-8 md:space-y-10">
                    
                    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase inline-block bg-white px-6 py-2 border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000]">
                            Overview
                        </h1>
                        <div className="bg-white border-[4px] border-black rounded-xl px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#000] flex items-center gap-2 w-fit">
                            SYS: <span className={systemHealth === 'Online' ? 'text-[#00FF44]' : 'text-[#FF0055]'}>{systemHealth}</span>
                        </div>
                    </header>

                    <MetricCards summary={summary} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        <div className={`space-y-10 ${canCreate ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                            <RecentLedger 
                                recent={recent} 
                                canCreate={canCreate} 
                                canDelete={canDelete} 
                                onEdit={setEditingRecord} 
                                onDelete={handleDelete} 
                            />
                            <Distribution categories={categories} />
                        </div>

                        {canCreate && (
                            <div className="lg:col-span-1">
                                <QuickLogForm 
                                    newRecord={newRecord}
                                    setNewRecord={setNewRecord}
                                    handleCreate={handleCreate}
                                    isSubmitting={isSubmitting}
                                    message={message}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <EditRecordModal 
                editingRecord={editingRecord}
                setEditingRecord={setEditingRecord}
                handleUpdate={handleUpdate}
                editMessage={editMessage}
            />

        </div>
    );
};

export default Dashboard;