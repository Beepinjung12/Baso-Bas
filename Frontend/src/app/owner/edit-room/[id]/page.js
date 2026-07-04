"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import config from "@/app/config";

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    roomSize: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${config.apiUrl}/api/rooms`,
          {
            withCredentials: true,
          }
        );

        const room = res.data.data.find((r) => r._id === id);

        if (room) {
          setForm({
            title: room.title || "",
            location: room.location || "",
            description: room.description || "",
            roomSize: room.roomSize || "",
          });
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${config.apiUrl}/api/rooms/${id}`,
        form,
        {
          withCredentials: true,
        }
      );

      alert("Room updated successfully!");

      router.push("/owner/list-rooms");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-lg">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
          <span className="font-medium text-slate-600">
            Loading room...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-400 to-sky-200 px-10 py-14">

        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10"></div>

        <div className="relative z-10">

          <h1 className="font-playfair text-5xl font-semibold leading-tight text-white">
            Edit your
            <br />
            room listing
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/80">
            Update your room details to keep your listing accurate and
            attractive for tenants.
          </p>

        </div>

      </section>

      {/* Form */}

      <div className="relative z-20 -mt-10 px-10 pb-10">

        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-8">

            <h2 className="font-playfair text-3xl font-semibold text-slate-800">
              Room Information
            </h2>

            <p className="mt-2 text-slate-500">
              Modify your room information below and save your changes.
            </p>

          </div>

          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            {/* Title */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Room Title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="Modern Apartment"
              />

            </div>

            {/* Location */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Location
              </label>

              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="Kathmandu"
              />

            </div>

            {/* Room Size */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Room Size
              </label>

              <input
                type="text"
                value={form.roomSize}
                onChange={(e) =>
                  setForm({
                    ...form,
                    roomSize: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="200 sq.ft"
              />

            </div>

            {/* Description */}

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="Write a detailed description..."
              />

            </div>

            {/* Buttons */}

            <div className="flex gap-4 pt-2">

              <button
                type="submit"
                className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700 hover:shadow-lg"
              >
                💾 Save Changes
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}