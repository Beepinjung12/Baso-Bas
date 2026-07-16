"use client";

import { useRef } from "react";
import config from "@/app/config";

function resolvePreviewSrc(item) {
  if (!item) {
    return "/default-room.jpg";
  }

  // Cloudinary URL
  if (typeof item === "string") {
    return item;
  }

  // MongoDB image object
  if (item.url) {
    return item.url;
  }

  // New selected file
  if (item instanceof File) {
    return URL.createObjectURL(item);
  }

  return "/default-room.jpg";
}

export default function RoomImageUpload({
  files = [],
  onFilesChange,
  existingImages = [],
  onExistingImagesChange,
  maxFiles = 5,
  label = "Room Photos",
}) {
  const inputRef = useRef(null);
  const totalCount = existingImages.length + files.length;
  const canAddMore = totalCount < maxFiles;

  const handleFileChange = (event) => {
    const selected = Array.from(event.target.files || []);
    const availableSlots = maxFiles - existingImages.length;
    const nextFiles = [...files, ...selected].slice(0, availableSlots);

    onFilesChange?.(nextFiles);
    event.target.value = "";
  };

  const removeNewFile = (index) => {
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    onExistingImagesChange?.(
      existingImages.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <label className="mb-2 block font-medium text-slate-700">{label}</label>

      <p className="mb-3 text-sm text-slate-500">
        Upload up to {maxFiles} images (JPG, PNG, WebP, GIF — max 5MB each)
      </p>

      {(existingImages.length > 0 || files.length > 0) && (
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {existingImages.map((image, index) => (
            <div
              key={`existing-${image}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
            >
              <img
                src={resolvePreviewSrc(image)}
                alt={`Room photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}

          {files.map((file, index) => (
            <div
              key={`new-${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
            >
              <img
                src={resolvePreviewSrc(file)}
                alt={file.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeNewFile(index)}
                className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-xl border border-dashed border-sky-300 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
          >
            + Add Photos ({totalCount}/{maxFiles})
          </button>
        </div>
      )}
    </div>
  );
}
