"use client";

import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

export default function RoomsTable({ rooms, onEdit, onDelete, deletingId }) {
  if (!rooms.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
        <p className="text-sm text-slate-400">No rooms listed yet.</p>
        <p className="mt-1 text-xs text-slate-300">
          Add your first room using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-5 py-3 font-medium text-slate-500">Title</th>
              <th className="px-5 py-3 font-medium text-slate-500">Location</th>
              <th className="px-5 py-3 font-medium text-slate-500">Size</th>
              <th className="px-5 py-3 font-medium text-slate-500">Rooms</th>
              <th className="px-5 py-3 font-medium text-slate-500">Added</th>
              <th className="px-5 py-3 text-right font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room._id}
                className="border-b border-slate-50 transition hover:bg-slate-50/50"
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-slate-700">{room.title}</p>
                  {room.description && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                      {room.description}
                    </p>
                  )}
                </td>
                <td className="px-5 py-3.5 text-slate-600">{room.location}</td>
                <td className="px-5 py-3.5 text-slate-500">
                  {room.roomSize || "—"}
                </td>
                <td className="px-5 py-3.5 text-slate-500">
                  {room.numberOfRooms ?? "—"}
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-400">
                  {new Date(room.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(room)}
                      className="cursor-pointer rounded-lg p-2 text-sky-600 transition hover:bg-sky-50"
                      title="Edit"
                    >
                      <RiEditLine className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(room._id)}
                      disabled={deletingId === room._id}
                      className="cursor-pointer rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                      title="Delete"
                    >
                      <RiDeleteBinLine className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
