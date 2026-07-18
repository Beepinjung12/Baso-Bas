"use client";

import axios from "axios";
import config from "@/app/config";
import { useCallback, useEffect, useState } from "react";
import RoomsTable from "../../components/admin/RoomsTable";
import {
  getAdminRooms,
  getRooms,
  deleteRoom,
} from "../../api/rooms";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({
    type: "",
    text: ""
  });

    const fetchRooms = useCallback(async () => {
      try {
        const res = await getAdminRooms();

        console.log("ADMIN ROOMS:", res.data);

        setRooms(res.data?.data ?? []);

      } catch {
        setMessage({
          type: "error",
          text: "Failed to load rooms.",
        });
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleDelete = async (id) => {
    if (!window.confirm(
      "Are you sure you want to delete this room?"
    )) return;

    setDeletingId(id);

    try {
      await deleteRoom(id);

      setMessage({
        type: "success",
        text: "Room deleted successfully."
      });

      fetchRooms();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message ||
          "Failed to delete room."
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async(id)=>{

  try{

    await axios.put(
      `${config.apiUrl}/api/rooms/${id}/featured`,
      {},
      {
        withCredentials:true
      }
    );


    fetchRooms();


  }catch(error){
    console.log(error);
  }

};
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Rooms
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage all room listings on the platform
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
          Loading rooms...
        </div>
      ) : (
        <RoomsTable
          rooms={rooms}
          onDelete={handleDelete}
          deletingId={deletingId}
          onToggleFeatured={handleToggleFeatured}
        />
      )}
    </div>
  );
}

