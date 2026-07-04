"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RiUserLine,
  RiHome4Line,
  RiShieldUserLine,
  RiGroupLine,
} from "react-icons/ri";
import StatCard from "../components/admin/StatCard";
import { getAdminStats } from "../api/admin";
import { ADMIN_ROOMS_ROUTE, ADMIN_USERS_ROUTE } from "../constants/routes";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats(res.data?.data);
      } catch {
        setError("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Overview of your BasoBas platform
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
          Loading stats...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Rooms"
              value={stats?.totalRooms ?? 0}
              icon={RiHome4Line}
              accent="sky"
            />
            <StatCard
              label="Registered Users"
              value={stats?.totalUsers ?? 0}
              icon={RiUserLine}
              accent="emerald"
            />
            <StatCard
              label="Administrators"
              value={stats?.totalAdmins ?? 0}
              icon={RiShieldUserLine}
              accent="violet"
            />
            <StatCard
              label="Total Accounts"
              value={stats?.totalAccounts ?? 0}
              icon={RiGroupLine}
              accent="amber"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={ADMIN_ROOMS_ROUTE}
              className="group rounded-2xl border border-slate-100 bg-white p-6 no-underline shadow-sm transition hover:border-sky-200 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <RiHome4Line className="text-xl" />
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-sky-700">
                Manage Rooms
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Add, edit, or remove room listings
              </p>
            </Link>

            <Link
              href={ADMIN_USERS_ROUTE}
              className="group rounded-2xl border border-slate-100 bg-white p-6 no-underline shadow-sm transition hover:border-sky-200 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <RiUserLine className="text-xl" />
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-sky-700">
                Manage Users
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                View and manage registered accounts
              </p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
