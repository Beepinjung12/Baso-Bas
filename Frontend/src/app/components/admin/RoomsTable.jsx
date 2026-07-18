"use client";

import { RiDeleteBinLine, RiEyeLine } from "react-icons/ri";

export default function RoomsTable({
  rooms,
  onDelete,
  deletingId,
  onToggleFeatured,
}) {
  if (!rooms.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
        <p className="text-sm text-slate-400">
          No rooms listed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-5 py-3 font-medium text-slate-500">
                Owner
              </th>

              <th className="px-5 py-3 font-medium text-slate-500">
                Photo
              </th>

              <th className="px-5 py-3 font-medium text-slate-500">
                Title
              </th>

              <th className="px-5 py-3 font-medium text-slate-500">
                Location
              </th>

              <th className="px-5 py-3 font-medium text-slate-500">
                Size
              </th>

              <th className="px-5 py-3 font-medium text-slate-500">
                Rooms
              </th>

              <th className="px-5 py-3 font-medium text-slate-500">
                Added
              </th>

              <th className="px-5 py-3 text-right font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr
                key={room._id}
                className="border-b border-slate-50 hover:bg-slate-50/50"
              >
                {/* OWNER */}
                <td className="px-5 py-3.5">
                  <p className="font-medium text-slate-700">
                    {room.owner?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {room.owner?.phone || ""}
                  </p>
                </td>

                {/* PHOTO */}
                <td className="px-5 py-3.5">
                  <img
                    src={room.image || "/default-room.jpg"}
                    alt={room.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>

                {/* TITLE */}
                <td className="px-5 py-3.5">
                  <p className="font-medium text-slate-700">
                    {room.title}
                  </p>
                </td>

                {/* LOCATION */}
                <td className="px-5 py-3.5 text-slate-600">
                  {room.location}
                </td>

                {/* SIZE */}
                <td className="px-5 py-3.5 text-slate-500">
                  {room.roomSize || "—"}
                </td>

                {/* ROOMS */}
                <td className="px-5 py-3.5 text-slate-500">
                  {room.numberOfRooms ?? "—"}
                </td>

                {/* DATE */}
                <td className="px-5 py-3.5 text-xs text-slate-400">
                  {new Date(room.createdAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-2">
                    {/* VIEW */}
                    <button
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                      title="View Room"
                    >
                      <RiEyeLine className="text-lg" />
                    </button>

                    {/* FEATURE */}
                    <button
                      onClick={() => onToggleFeatured(room._id)}
                      className={`rounded-lg px-3 py-1 text-xs font-medium ${
                        room.featured
                          ? "bg-amber-50 text-amber-600"
                          : "bg-sky-50 text-sky-600"
                      }`}
                    >
                      {room.featured
                        ? "Remove Featured"
                        : "Set Featured"}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => onDelete(room._id)}
                      disabled={deletingId === room._id}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
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