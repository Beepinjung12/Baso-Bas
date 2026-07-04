"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      router.replace("/auth/login");
      return;
    }

    if (user?.role !== "admin") {
      router.replace("/");
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
          Verifying access...
        </div>
      </div>
    );
  }

  if (!isLoggedIn || user?.role !== "admin") {
    return null;
  }

  return children;
}
