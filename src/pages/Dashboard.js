import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0 });
  const [categories, setCategories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [newRecord, setNewRecord] = useState({ amount: '', type: 'income', category: '', date: '', description: '' });
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const [summaryRes, catRes, recentRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/dashboard/category-totals'),
        api.get('/dashboard/recent?limit=5')
      ]);
      setSummary(summaryRes.data);
      setCategories(catRes.data);
      setRecent(recentRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/records', newRecord);
      setMessage('Record created!');
      setNewRecord({ amount: '', type: 'income', category: '', date: '', description: '' });
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create');
    }
  };

  const canCreate = ['analyst', 'admin'].includes(user?.role);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name} ({user?.role})</p>
      <div className="summary-cards">
        <div>Total Income: ₹{summary.totalIncome}</div>
        <div>Total Expenses: ₹{summary.totalExpenses}</div>
        <div>Net Balance: ₹{summary.netBalance}</div>
      </div>

      <h3>Category Totals</h3>
      <ul>
        {categories.map(c => <li key={c.category}>{c.category} ({c.type}): ₹{c.total}</li>)}
      </ul>

      <h3>Recent Transactions</h3>
      <ul>
        {recent.map(r => <li key={r.id}>{r.date} – {r.category} – ₹{r.amount} ({r.type})</li>)}
      </ul>

      {canCreate && (
        <>
          <h3>Add New Record</h3>
          <form onSubmit={handleCreate}>
            <input type="number" placeholder="Amount" value={newRecord.amount} onChange={(e) => setNewRecord({...newRecord, amount: e.target.value})} required />
            <select value={newRecord.type} onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input placeholder="Category" value={newRecord.category} onChange={(e) => setNewRecord({...newRecord, category: e.target.value})} required />
            <input type="date" value={newRecord.date} onChange={(e) => setNewRecord({...newRecord, date: e.target.value})} required />
            <input placeholder="Description" value={newRecord.description} onChange={(e) => setNewRecord({...newRecord, description: e.target.value})} />
            <button type="submit">Add</button>
          </form>
          {message && <div>{message}</div>}
        </>
      )}

      <div>
        <Link to="/records">View All Records</Link>
        {user?.role === 'admin' && <Link to="/users">Manage Users</Link>}
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;