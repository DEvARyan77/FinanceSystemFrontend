import { useEffect, useState } from 'react';
import api from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  const handleUpdate = async (id) => {
    await api.put(`/users/${id}`, editForm);
    setEditing(null);
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete user?')) {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {editing === user.id ? (
                <>
                  <td><input value={editForm.name || user.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} /></td>
                  <td><input value={editForm.email || user.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} /></td>
                  <td><select value={editForm.role || user.role} onChange={(e) => setEditForm({...editForm, role: e.target.value})}><option>viewer</option><option>analyst</option><option>admin</option></select></td>
                  <td><select value={editForm.status || user.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}><option>active</option><option>inactive</option></select></td>
                  <td><button onClick={() => handleUpdate(user.id)}>Save</button><button onClick={() => setEditing(null)}>Cancel</button></td>
                </>
              ) : (
                <>
                  <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.status}</td>
                  <td><button onClick={() => { setEditing(user.id); setEditForm({}); }}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;