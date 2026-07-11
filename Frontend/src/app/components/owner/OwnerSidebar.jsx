// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";
// import {
//   LayoutDashboard,
//   Building2,
//   PlusCircle,
//   UserCircle,
//   ArrowLeft,
// } from "lucide-react";

// export default function OwnerSidebar() {
//   const pathname = usePathname();
//   const { user } = useAuth();

//   const username = user?.name || "Guest";

//   const initials = username
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

//   const menu = [
//     {
//       title: "Dashboard",
//       href: "/owner",
//       icon: LayoutDashboard,
//     },
//     {
//       title: "My Rooms",
//       href: "/owner/list-rooms",
//       icon: Building2,
//     },
//     {
//       title: "Create Room",
//       href: "/owner/create-room",
//       icon: PlusCircle,
//     },
//     {
//       title: "Profile",
//       href: "/owner/profile",
//       icon: UserCircle,
//     },
//   ];

//   const isActive = (href) => {
//     // Dashboard active ONLY on /owner
//     if (href === "/owner") {
//       return pathname === "/owner";
//     }

//     // Other pages active on themselves and nested routes
//     return pathname === href || pathname.startsWith(href + "/");
//   };

//   return (
//     <aside className="sticky top-0 flex h-screen w-72 flex-col overflow-hidden shadow-2xl">

//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-sky-700 via-sky-500 to-sky-300" />

//       {/* Decorative */}
//       <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
//       <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/5" />

//       <div className="relative z-10 flex h-full flex-col p-7">

//         {/* Hero */}
//         <div>
//           <h1 className="font-playfair text-4xl font-semibold leading-tight text-white">
//             Manage your
//             <br />
//             rooms,
//             <br />
//             effortlessly
//           </h1>

//           <p className="mt-3 text-sm text-white/80">
//             Welcome back, {username.split(" ")[0]} 👋
//           </p>
//         </div>

//         {/* User Card */}
//         <div className="mt-8 rounded-3xl border border-white/20 bg-white/15 p-5 backdrop-blur-xl">

//           <div className="flex items-center gap-4">

//             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-sky-700 shadow-lg">
//               {initials}
//             </div>

//             <div className="overflow-hidden">

//               <h3 className="truncate font-semibold text-white">
//                 {username}
//               </h3>

//               <p className="text-sm text-white/70">
//                 Property Owner
//               </p>

//             </div>

//           </div>

//         </div>

//         {/* Navigation */}
//         <nav className="mt-10 flex-1 space-y-3">

//           {menu.map((item) => {
//             const Icon = item.icon;
//             const active = isActive(item.href);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
//                   active
//                     ? "bg-white text-sky-700 shadow-xl scale-[1.02]"
//                     : "border border-transparent bg-white/10 text-white hover:border-white/20 hover:bg-white/20 hover:translate-x-1"
//                 }`}
//               >
//                 <Icon
//                   size={22}
//                   className={`transition ${
//                     active ? "text-sky-700" : "text-white"
//                   }`}
//                 />

//                 <span className="font-medium">
//                   {item.title}
//                 </span>
//               </Link>
//             );
//           })}

//         </nav>

//         {/* Footer */}
//         <div className="space-y-4">

//           <Link
//             href="/"
//             className="flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 py-4 text-white transition hover:bg-white/20"
//           >
//             <ArrowLeft size={22} />

//             <span className="font-medium">
//               Back to Website
//             </span>

//           </Link>

//           <div className="border-t border-white/20 pt-4 text-center">

//             <p className="text-xs uppercase tracking-[0.35em] text-white/70">
//               BASOBAS OWNER
//             </p>

//           </div>

//         </div>

//       </div>

//     </aside>
//   );
// }




"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function OwnerSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const username = user?.name || "Guest";

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const menu = [
    {
      title: "Dashboard",
      href: "/owner",
      icon: "📊",
    },
    {
      title: "My Rooms",
      href: "/owner/list-rooms",
      icon: "🏠",
    },
    {
      title: "Create Room",
      href: "/owner/create-room",
      icon: "➕",
    },
    {
      title: "Profile",
      href: "/owner/profile",
      icon: "👤",
    },
  ];

  const isActive = (href) => {
    if (href === "/owner") {
      return pathname === "/owner";
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col overflow-hidden shadow-2xl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-700 via-sky-500 to-sky-300" />

      {/* Decorative */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex h-full flex-col p-7">
        {/* Hero */}
        <div>
          <h1 className="font-playfair text-4xl font-semibold leading-tight text-white">
            Manage your
            <br />
            rooms,
            <br />
            effortlessly
          </h1>

          <p className="mt-3 text-sm text-white/80">
            Welcome back, {username.split(" ")[0]} 👋
          </p>
        </div>

        {/* User Card */}
        <div className="mt-8 rounded-3xl border border-white/20 bg-white/15 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-sky-700 shadow-lg">
              {initials}
            </div>

            <div className="overflow-hidden">
              <h3 className="truncate font-semibold text-white">
                {username}
              </h3>

              <p className="text-sm text-white/70">
                Property Owner
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10 flex-1 space-y-3">
          {menu.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  active
                    ? "bg-white text-sky-700 shadow-xl scale-[1.02]"
                    : "border border-transparent bg-white/10 text-white hover:border-white/20 hover:bg-white/20 hover:translate-x-1"
                }`}
              >
                <span className="text-2xl">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 py-4 text-white transition hover:bg-white/20"
          >
            <span className="text-xl">⬅️</span>

            <span className="font-medium">
              Back to Website
            </span>
          </Link>

          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              BASOBAS OWNER
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}