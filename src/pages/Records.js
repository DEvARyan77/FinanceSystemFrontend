import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Records = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0, total: 0, pages: 0 });
  const [filters, setFilters] = useState({ type: '', category: '', from: '', to: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchRecords = async () => {
    const params = { ...filters, limit: pagination.limit, offset: pagination.offset };
    if (user?.role === 'admin') params.all = 'true';
    const res = await api.get('/records', { params });
    setRecords(res.data.data);
    setPagination(res.data.pagination);
  };

  useEffect(() => {
    fetchRecords();
  }, [filters, pagination.offset, pagination.limit]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this record?')) {
      await api.delete(`/records/${id}`);
      fetchRecords();
    }
  };

  const handleUpdate = async (id) => {
    await api.put(`/records/${id}`, editData);
    setEditingId(null);
    fetchRecords();
  };

  const canEdit = ['analyst', 'admin'].includes(user?.role);
  const canDelete = user?.role === 'admin';

  return (
    <div>
      <h2>Financial Records</h2>
      <div className="filters">
        <input placeholder="Category" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} />
        <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="date" value={filters.from} onChange={(e) => setFilters({...filters, from: e.target.value})} placeholder="From" />
        <input type="date" value={filters.to} onChange={(e) => setFilters({...filters, to: e.target.value})} placeholder="To" />
        <button onClick={() => setFilters({ type: '', category: '', from: '', to: '' })}>Clear</button>
      </div>

      <table>
        <thead><tr><th>Date</th><th>Category</th><th>Type</th><th>Amount</th><th>Description</th><th>Actions</th></tr></thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              {editingId === record.id ? (
                <>
                  <td><input type="date" value={editData.date || record.date} onChange={(e) => setEditData({...editData, date: e.target.value})} /></td>
                  <td><input value={editData.category || record.category} onChange={(e) => setEditData({...editData, category: e.target.value})} /></td>
                  <td><select value={editData.type || record.type} onChange={(e) => setEditData({...editData, type: e.target.value})}><option>income</option><option>expense</option></select></td>
                  <td><input type="number" value={editData.amount || record.amount} onChange={(e) => setEditData({...editData, amount: e.target.value})} /></td>
                  <td><input value={editData.description || record.description} onChange={(e) => setEditData({...editData, description: e.target.value})} /></td>
                  <td><button onClick={() => handleUpdate(record.id)}>Save</button><button onClick={() => setEditingId(null)}>Cancel</button></td>
                </>
              ) : (
                <>
                  <td>{record.date}</td><td>{record.category}</td><td>{record.type}</td><td>₹{record.amount}</td><td>{record.description}</td>
                  <td>
                    {canEdit && <button onClick={() => { setEditingId(record.id); setEditData({}); }}>Edit</button>}
                    {canDelete && <button onClick={() => handleDelete(record.id)}>Delete</button>}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={pagination.offset === 0} onClick={() => setPagination({...pagination, offset: pagination.offset - pagination.limit})}>Previous</button>
        <span>Page {Math.floor(pagination.offset/pagination.limit)+1} of {pagination.pages}</span>
        <button disabled={pagination.offset + pagination.limit >= pagination.total} onClick={() => setPagination({...pagination, offset: pagination.offset + pagination.limit})}>Next</button>
      </div>
    </div>
  );
};

export default Records;