"use client";

import { useEffect, useState } from "react";

import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "@/app/api/wishlist";

export default function WishlistButton({ roomId }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (roomId) {
      checkStatus();
    }
  }, [roomId]);

  async function checkStatus() {
    try {
      const res = await checkWishlist(roomId);
      setLiked(res.data.liked);
    } catch (error) {
      console.log("CHECK WISHLIST ERROR:", error);
    }
  }

  async function toggleWishlist() {
    try {
      setLoading(true);

      if (liked) {
        await removeFromWishlist(roomId);
        setLiked(false);
      } else {
        await addToWishlist(roomId);
        setLiked(true);
      }
    } catch (error) {
      console.log("WISHLIST UPDATE ERROR:", error);

      alert(
        error?.response?.data?.message ||
        "Please login first"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
        liked
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
      }`}
    >
      {loading
        ? "Saving..."
        : liked
          ? "❤️ Saved"
          : "♡ Add Wishlist"
      }
    </button>
  );
}