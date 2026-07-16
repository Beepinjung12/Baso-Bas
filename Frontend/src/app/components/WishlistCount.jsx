"use client";

import { useEffect, useState } from "react";
import { getMyWishlist } from "@/app/api/wishlist";

export default function WishlistCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  async function fetchCount() {
    try {
      const res = await getMyWishlist();
      setCount(res.data.count || 0);
    } catch (error) {
      // User not logged in
      setCount(0);
    }
  }

  return (
    <>
      Wishlist
      {count > 0 && (
        <span className="ml-1">
          ({count})
        </span>
      )}
    </>
  );
}