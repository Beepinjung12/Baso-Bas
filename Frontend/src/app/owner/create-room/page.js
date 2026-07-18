"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import RoomImageUpload from "@/app/components/RoomImageUpload";
import { createRoom } from "@/app/api/rooms";

export default function CreateRoomPage() {
  const router = useRouter();

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("CREATE ROOM SUBMIT");
    console.log("FORM DATA:", form);

    try {
      await createRoom(
        {
          ...form,
          rent: Number(form.rent),
          numberOfRooms: Number(form.numberOfRooms),
        },
        imageFiles
      );

      alert("Room created successfully!");
      router.push("/owner/list-rooms");
    } catch (error) {
      console.log("CREATE ROOM ERROR:", error);

      alert(
        error?.response?.data?.message ||
        "Room creation failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="
        bg-gradient-to-br
        from-sky-600
        via-sky-400
        to-sky-200
        px-10
        py-14
      ">
        <h1 className="text-5xl font-semibold text-white">
          Create your
          <br />
          room listing
        </h1>

        <p className="mt-4 text-white/80">
          Add your room details
        </p>
      </section>

      <div className="px-10 pb-10 -mt-10">
        <div className="
          mx-auto
          max-w-5xl
          rounded-3xl
          bg-white
          p-8
          shadow-xl
        ">
          <h2 className="text-3xl font-semibold">
            Room Information
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
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

            <button
              type="submit"
              className="
                rounded-xl
                bg-sky-600
                px-8
                py-3
                font-semibold
                text-white
              "
            >
              Create Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}