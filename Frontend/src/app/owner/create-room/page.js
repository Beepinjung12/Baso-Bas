"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import config from "@/app/config";

export default function CreateRoom() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    roomSize: "",
    numberOfRooms: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `${config.apiUrl}/api/rooms`,
        form,
        {
          withCredentials: true,
        }
      );

      alert("Room created successfully!");

      router.push("/owner/list-rooms");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-400 to-sky-200 px-10 py-14">

        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10"></div>

        <div className="relative z-10">

          <h1 className="font-playfair text-5xl font-semibold leading-tight text-white">
            Create your
            <br />
            next listing
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/80">
            Add a new room listing and make it available for potential tenants.
          </p>

        </div>

      </section>

      {/* Form */}

      <div className="relative z-20 -mt-10 px-10 pb-10">

        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-8">

            <h2 className="font-playfair text-3xl font-semibold text-slate-800">
              Room Information
            </h2>

            <p className="mt-2 text-slate-500">
              Fill in all the details below to publish a new property.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Room Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Modern Apartment"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  required
                />

              </div>

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Location
                </label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Kathmandu"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  required
                />

              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Room Size
                </label>

                <input
                  name="roomSize"
                  value={form.roomSize}
                  onChange={handleChange}
                  placeholder="250 sq.ft"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  required
                />

              </div>

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Number of Rooms
                </label>

                <input
                  type="number"
                  min="1"
                  name="numberOfRooms"
                  value={form.numberOfRooms}
                  onChange={handleChange}
                  placeholder="2"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  required
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows="6"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your room, nearby facilities, amenities, parking, internet, water supply, etc."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                required
              />

            </div>

            <div className="flex flex-wrap gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-400"
              >
                {loading ? "Creating..." : "🏠 Create Room"}
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