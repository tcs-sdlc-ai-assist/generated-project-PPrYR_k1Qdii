import { useState, useEffect } from 'react';
import { getUsers, saveUsers } from '../utils/storage';
import { getSession } from '../utils/auth';
import { getAvatar } from '../components/Avatar';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setUsers(getUsers());
    setSession(getSession());
    setLoading(false);
  }, []);

  const refreshUsers = () => {
    setUsers(getUsers());
  };

  const resetForm = () => {
    setNewDisplayName('');
    setNewUsername('');
    setNewPassword('');
    setNewRole('user');
    setFormError('');
    setShowCreateForm(false);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    setFormError('');

    if (!newDisplayName.trim() || !newUsername.trim() || !newPassword.trim()) {
      setFormError('All fields are required.');
      return;
    }

    if (newUsername.trim().toLowerCase() === 'admin') {
      setFormError('Username "admin" is reserved.');
      return;
    }

    const usernameExists = users.some(
      (u) => u.username.toLowerCase() === newUsername.trim().toLowerCase()
    );
    if (usernameExists) {
      setFormError('A user with that username already exists.');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      displayName: newDisplayName.trim(),
      username: newUsername.trim(),
      password: newPassword,
      role: newRole,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
    refreshUsers();
    resetForm();
  };

  const handleDeleteUser = (user) => {
    if (
      window.confirm(
        `Are you sure you want to delete user "${user.displayName}"?`
      )
    ) {
      const updatedUsers = users.filter((u) => u.id !== user.id);
      saveUsers(updatedUsers);
      refreshUsers();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const canDelete = (user) => {
    if (user.username === 'admin') return false;
    if (session && user.id === session.userId) return false;
    return true;
  };

  const getDeleteTitle = (user) => {
    if (user.username === 'admin')
      return 'Default admin cannot be deleted.';
    if (session && user.id === session.userId)
      return 'You cannot delete your own account.';
    return '';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="bg-surface-2 rounded-lg h-10 w-64" />
            <div className="bg-surface-2 rounded-xl h-10 w-36" />
          </div>
          <div className="bg-surface rounded-2xl ring-1 ring-border h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold text-text">
          User Management
        </h1>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setFormError('');
          }}
          className="bg-accent text-accent-fg px-5 py-2.5 rounded-xl font-medium hover:bg-accent-hover transition-colors cursor-pointer"
        >
          {showCreateForm ? 'Cancel' : '+ Create User'}
        </button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-surface rounded-2xl ring-1 ring-border p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-text mb-4">
            Create New User
          </h2>

          {formError && (
            <div
              className="text-danger text-sm bg-danger-light rounded-lg px-3 py-2 mb-4"
              role="alert"
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleCreateUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-text mb-1.5"
                >
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-text mb-1.5"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface"
                  placeholder="janedoe"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-text mb-1.5"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl ring-1 ring-border focus:ring-2 focus:ring-accent focus:outline-none text-text bg-surface cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-accent text-accent-fg px-5 py-2.5 rounded-xl font-medium hover:bg-accent-hover transition-colors cursor-pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="text-text-muted hover:text-text px-5 py-2.5 rounded-xl font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block bg-surface rounded-2xl ring-1 ring-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-2 text-text-muted text-sm font-medium">
              <th className="text-left px-6 py-4 w-16">Avatar</th>
              <th className="text-left px-6 py-4">Display Name</th>
              <th className="text-left px-6 py-4">Username</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Created</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-text-muted"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-6 py-4">{getAvatar(user.role)}</td>
                  <td className="px-6 py-4 font-medium text-text">
                    {user.displayName}
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="inline-block bg-violet-100 text-violet-700 ring-1 ring-violet-300 rounded-full px-3 py-0.5 text-xs font-medium">
                        admin
                      </span>
                    ) : (
                      <span className="inline-block bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300 rounded-full px-3 py-0.5 text-xs font-medium">
                        user
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-text-muted text-sm tabular-nums">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      disabled={!canDelete(user)}
                      title={getDeleteTitle(user)}
                      className={`text-sm font-medium ${
                        canDelete(user)
                          ? 'text-danger hover:underline cursor-pointer'
                          : 'opacity-50 cursor-not-allowed text-text-muted'
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <p className="text-text-muted text-center py-12">No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-surface rounded-xl ring-1 ring-border p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                {getAvatar(user.role)}
                <span className="font-medium text-text">
                  {user.displayName}
                </span>
                {user.role === 'admin' ? (
                  <span className="inline-block bg-violet-100 text-violet-700 ring-1 ring-violet-300 rounded-full px-3 py-0.5 text-xs font-medium">
                    admin
                  </span>
                ) : (
                  <span className="inline-block bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300 rounded-full px-3 py-0.5 text-xs font-medium">
                    user
                  </span>
                )}
              </div>
              <div className="text-text-muted text-sm mb-3">
                <p>@{user.username}</p>
                <p>Created {formatDate(user.createdAt)}</p>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteUser(user)}
                  disabled={!canDelete(user)}
                  title={getDeleteTitle(user)}
                  className={`text-sm font-medium ${
                    canDelete(user)
                      ? 'text-danger hover:underline cursor-pointer'
                      : 'opacity-50 cursor-not-allowed text-text-muted'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
