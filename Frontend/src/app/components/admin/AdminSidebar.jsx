"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  RiDashboardLine,
  RiHome4Line,
  RiUserLine,
  RiCalendarCheckLine,
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

const menu = [
  {
    title: "Dashboard",
    href: ADMIN_ROUTE,
    icon: "📊",
  },
  {
    title: "Rooms",
    href: ADMIN_ROOMS_ROUTE,
    icon: "🏠",
  },
  {
    title: "Users",
    href: ADMIN_USERS_ROUTE,
    icon: "👥",
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: "📅",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    logout
  } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // Ignore
    } finally {
      logout();
      router.push("/auth/login");
    }
  };

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        shrink-0
        flex-col
        bg-white
        border-r
        border-slate-200
      "
    >
      {/* LOGO */}
      <div className="border-b border-slate-100 px-6 py-5">
        <Link href="/">
          <span className="font-serif text-2xl font-bold text-sky-800">
            BASO
            <span className="text-sky-400">BAS</span>
          </span>
        </Link>

        <p className="mt-1 text-xs text-slate-400">
          Admin Panel
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-2 px-4 py-5">
        {menu.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-4
                rounded-2xl
                px-4
                py-3
                text-sm
                transition
                ${
                  active
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER SECTION */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 font-bold text-sky-700">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-700">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="
            mb-2
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-slate-500
            hover:bg-slate-50
            hover:text-sky-600
          "
        >
          <RiArrowLeftLine />
          Back to site
        </Link>

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-red-500
            hover:bg-red-50
          "
        >
          <RiLogoutBoxLine />
          Logout
        </button>
      </div>
    </aside>
  );
}