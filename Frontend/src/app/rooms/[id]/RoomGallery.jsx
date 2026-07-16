"use client";

import Image from "next/image";
import { useState } from "react";

export default function RoomGallery({ images = [], title }) {
  // Convert Cloudinary objects to URLs
  const imageUrls = images.map((img) =>
    typeof img === "object" ? img.url : img
  );

  const [activeImage, setActiveImage] = useState(
    imageUrls[0] || "/default-room.jpg"
  );

  return (
    <div>
      <div className="relative h-[450px] rounded-t-3xl overflow-hidden">
        <Image
          src={activeImage}
          alt={title || "Room"}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {imageUrls.length > 1 && (
        <div className="grid grid-cols-4 gap-3 p-4">
          {imageUrls.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`
                relative h-24 rounded-xl overflow-hidden border-2
                ${
                  activeImage === img
                    ? "border-sky-500"
                    : "border-transparent"
                }
              `}
            >
              <Image
                src={img}
                alt={`${title} ${index}`}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}