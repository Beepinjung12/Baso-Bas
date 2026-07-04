"use client";

import { useCallback, useEffect, useState } from "react";
import UsersTable from "../../components/admin/UsersTable";
import { getAllUsers, deleteUser } from "../../api/admin";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data?.data ?? []);
    } catch {
      setMessage({ type: "error", text: "Failed to load users." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeletingId(id);
    setMessage({ type: "", text: "" });
    try {
      await deleteUser(id);
      setMessage({ type: "success", text: "User deleted successfully." });
      await fetchUsers();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete user.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Users</h1>
        <p className="mt-1 text-sm text-slate-400">
          View and manage all registered accounts
        </p>
      </div>

      {message.text && (
        <div
          className={`mb-6 rounded-xl px-4 py-3 text-sm ${
            message.type === "success"
              ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
              : "border border-red-100 bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
          Loading users...
        </div>
      ) : (
        <UsersTable
          users={users}
          deletingId={deletingId}
          currentUserId={user?._id || user?.id}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
