"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookingSuccessPopup() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("booking") === "success") {
      setOpen(true);
    }
  }, [searchParams]);

  function closePopup() {
    setOpen(false);

    // Remove ?booking=success from the URL
    router.replace(window.location.pathname);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl text-center">
        <div className="text-6xl mb-4">✅</div>

        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful
        </h2>

        <p className="mt-3 text-gray-600">
          Your booking has been confirmed successfully.
        </p>

        <button
          onClick={closePopup}
          className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}