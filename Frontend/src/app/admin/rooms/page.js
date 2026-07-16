"use client";

import { useCallback, useEffect, useState } from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import RoomForm from "../../components/admin/RoomForm";
import RoomsTable from "../../components/admin/RoomsTable";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../api/rooms";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchRooms = useCallback(async () => {
    try {
      const res = await getRooms();
      setRooms(res.data?.data ?? []);
    } catch {
      setMessage({ type: "error", text: "Failed to load rooms." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleCreate = async (data, imageFiles = []) => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await createRoom(data, imageFiles);
      setMessage({ type: "success", text: "Room added successfully." });
      setShowForm(false);
      await fetchRooms();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add room.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (data, imageFiles = [], keepImages = []) => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await updateRoom(editingRoom._id, data, imageFiles, keepImages);
      setMessage({ type: "success", text: "Room updated successfully." });
      setEditingRoom(null);
      await fetchRooms();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update room.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    setDeletingId(id);
    setMessage({ type: "", text: "" });
    try {
      await deleteRoom(id);
      setMessage({ type: "success", text: "Room deleted successfully." });
      await fetchRooms();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete room.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rooms</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage all room listings on the platform
          </p>
        </div>

        {!showForm && !editingRoom && (
          <button
            onClick={() => setShowForm(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
          >
            <RiAddLine className="text-lg" />
            Add Room
          </button>
        )}
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

      {(showForm || editingRoom) && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-700">
              {editingRoom ? "Edit Room" : "Add New Room"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingRoom(null);
              }}
              className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>
          <RoomForm
            initialData={editingRoom}
            loading={saving}
            onSubmit={editingRoom ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingRoom(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
          Loading rooms...
        </div>
      ) : (
        <RoomsTable
          rooms={rooms}
          deletingId={deletingId}
          onEdit={(room) => {
            setShowForm(false);
            setEditingRoom(room);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
