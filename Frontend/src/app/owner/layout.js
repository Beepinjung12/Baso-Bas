"use client";

import OwnerGuard from "../components/owner/OwnerGuard";
import OwnerSidebar from "../components/owner/OwnerSidebar";

export default function OwnerLayout({ children }) {
  return (
    <OwnerGuard>
      <div
        className="flex min-h-screen bg-slate-50"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
        `}</style>

        <OwnerSidebar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </OwnerGuard>
  );
}