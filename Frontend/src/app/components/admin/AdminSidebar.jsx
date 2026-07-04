"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  RiDashboardLine,
  RiHome4Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { logout as logoutApi } from "../../api/auth";
import {
  ADMIN_ROUTE,
  ADMIN_ROOMS_ROUTE,
  ADMIN_USERS_ROUTE,
} from "../../constants/routes";

const navItems = [
  { href: ADMIN_ROUTE, label: "Dashboard", icon: RiDashboardLine },
  { href: ADMIN_ROOMS_ROUTE, label: "Rooms", icon: RiHome4Line },
  { href: ADMIN_USERS_ROUTE, label: "Users", icon: RiUserLine },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // cookie may already be cleared
    } finally {
      logout();
      router.push("/auth/login");
    }
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-6 py-5">
        <Link href="/" className="no-underline">
          <span
            className="font-serif text-xl font-semibold text-sky-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            BASO<span className="text-sky-400">BAS</span>
          </span>
        </Link>
        <p className="mt-1 text-xs text-slate-400">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === ADMIN_ROUTE
              ? pathname === ADMIN_ROUTE
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm no-underline transition ${
                isActive
                  ? "bg-sky-50 font-medium text-sky-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sm font-bold text-sky-600">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-700">
              {user?.name}
            </p>
            <p className="truncate text-xs text-slate-400">{user?.phone}</p>
          </div>
        </div>

        <Link
          href="/"
          className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 no-underline transition hover:bg-slate-50 hover:text-sky-600"
        >
          <RiArrowLeftLine />
          Back to site
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
        >
          <RiLogoutBoxLine />
          Logout
        </button>
      </div>
    </aside>
  );
}
