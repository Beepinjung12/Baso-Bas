"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import config from "@/app/config";
import RoomImageUpload from "@/app/components/RoomImageUpload";
import { updateRoom } from "@/app/api/rooms";

export default function EditRoomPage() {
  const { id } = useParams();
  console.log("PARAM ID:", id);
  console.log("CURRENT ROOM ID:", id);
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
          `${config.apiUrl}/api/rooms/${params.id}`,
          {
            withCredentials: true
          }
        );

        const room = res.data.data;

        console.log("EDIT ROOM DATA:", room);

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

if (params?.id) {
  fetchRoom();
}
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleUpdate = async (e) => {
  e.preventDefault();

  const roomId = params?.id;

  console.log("BEFORE UPDATE CALL:", roomId);

  if (!roomId) {
    alert("Room ID missing");
    return;
  }

  try {
    await updateRoom(
      roomId,
      {
        ...form,
        rent: Number(form.rent),
        numberOfRooms: Number(form.numberOfRooms),
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
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        Loading room...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-br from-sky-600 via-sky-400 to-sky-200 px-10 py-14">
        <h1 className="text-5xl font-semibold text-white">
          Edit your
          <br />
          room listing
        </h1>

        <p className="mt-4 text-white/80">
          Update your room details.
        </p>
      </section>

      <div className="px-10 pb-10 -mt-10">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="text-3xl font-semibold text-slate-800">
            Room Information
          </h2>

          <form onSubmit={handleUpdate} className="mt-8 space-y-6">
            {/* Title */}
            <div>
              <label>Room Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            {/* Location */}
            <div>
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            {/* Rent + Contact */}
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

            {/* Whatsapp */}
            <div>
              <label>Whatsapp Number</label>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            {/* Room Size + Number */}
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

            {/* Description */}
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