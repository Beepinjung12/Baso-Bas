"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import config from "@/app/config";
import RoomImageUpload from "@/app/components/RoomImageUpload";
import { updateRoom } from "@/app/api/rooms";

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    location: "",
    rent: "",
    contact: "",
    whatsapp: "",
    roomSize: "",
    numberOfRooms: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await axios.get(
          `${config.apiUrl}/api/rooms`,
          {
            withCredentials: true
          }
        );

        const room = res.data.data.find(
          item => item._id === id
        );

        if (room) {
          setForm({
            title: room.title || "",
            location: room.location || "",
            rent: room.rent || "",
            contact: room.contact || "",
            whatsapp: room.whatsapp || "",
            roomSize: room.roomSize || "",
            numberOfRooms: room.numberOfRooms || "",
            description: room.description || "",
          });

          setExistingImages(room.images || []);
        }
      } catch (error) {
        console.log("FETCH ROOM ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateRoom(
        id,
        {
          ...form,
          rent: Number(form.rent),
          numberOfRooms: Number(form.numberOfRooms)
        },
        imageFiles,
        existingImages
      );

      alert("Room updated successfully!");
      router.push("/owner/list-rooms");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
        "Update failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading room...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-sky-600
        via-sky-400
        to-sky-200
        px-10
        py-14
      ">
        <h1 className="text-5xl font-semibold text-white">
          Edit your
          <br />
          room listing
        </h1>

        <p className="mt-4 text-white/80 text-lg">
          Update your room details
        </p>
      </section>

      <div className="relative z-20 -mt-10 px-10 pb-10">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="text-3xl font-semibold">
            Room Information
          </h2>

          <form onSubmit={handleUpdate} className="mt-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Room Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Rent</label>
                <input
                  type="number"
                  name="rent"
                  value={form.rent}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label>Contact Number</label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label>Whatsapp Number</label>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label>Room Size</label>
                <input
                  name="roomSize"
                  value={form.roomSize}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label>Number of Rooms</label>
                <input
                  type="number"
                  name="numberOfRooms"
                  value={form.numberOfRooms}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="6"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <RoomImageUpload
              files={imageFiles}
              onFilesChange={setImageFiles}
              existingImages={existingImages}
              onExistingImagesChange={setExistingImages}
            />

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white"
              >
                💾 Save Changes
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border px-8 py-3"
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