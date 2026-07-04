"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Settings</h1>

      <div className="border p-4 rounded-lg">
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Role:</b> {user?.role}</p>
      </div>
    </div>
  );
}