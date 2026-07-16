"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RoomImageUpload from "@/app/components/RoomImageUpload";

export default function RoomForm({ initialData, onSubmit, onCancel, loading }) {
  const isEditing = !!initialData;
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState(
    initialData?.images || []
  );

  useEffect(() => {
    setExistingImages(initialData?.images || []);
    setImageFiles([]);
  }, [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      location: initialData?.location || "",
      roomSize: initialData?.roomSize || "",
      numberOfRooms: initialData?.numberOfRooms || "",
      description: initialData?.description || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(
      {
        ...data,
        numberOfRooms: data.numberOfRooms
          ? Number(data.numberOfRooms)
          : undefined,
      },
      imageFiles,
      existingImages
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Title *
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="e.g. Cozy Studio Apartment"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Location *
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="e.g. Kathmandu, Thamel"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Room Size
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="e.g. 12x14 ft"
            {...register("roomSize")}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Number of Rooms
          </label>
          <input
            type="number"
            min="1"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="e.g. 2"
            {...register("numberOfRooms", {
              min: { value: 1, message: "Must be at least 1" },
            })}
          />
          {errors.numberOfRooms && (
            <p className="mt-1 text-xs text-red-500">
              {errors.numberOfRooms.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Description
        </label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          placeholder="Describe the room..."
          {...register("description")}
        />
      </div>

      <RoomImageUpload
        label="Room Photos"
        files={imageFiles}
        onFilesChange={setImageFiles}
        existingImages={existingImages}
        onExistingImagesChange={setExistingImages}
      />

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-xl bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600 disabled:bg-sky-300"
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Room"
              : "Add Room"}
        </button>
      </div>
    </form>
  );
}
