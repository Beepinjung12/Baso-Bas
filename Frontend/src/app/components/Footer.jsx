import React from "react";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="px-8 py-12 text-white/70" style={{ backgroundColor: "#0c4a6e" }}>
      {/* TOP */}
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-0">
        {/* Brand */}
        <div className="max-w-[220px]">
          <div className="mb-3">
            <Logo />
          </div>
          <p className="text-[13px] font-light leading-[1.6] text-white/60">
            Room rental made simple. Find, book, and move in — all in one place.
          </p>
        </div>

        {/* Explore */}
<div className="flex flex-col gap-2 text-[13px]">
  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Explore</h4>
  {[
    { label: "Search rooms", href: "/explore#search" },
    { label: "View listings", href: "/explore#listings" },
    {
      label: "Map view",
      href: "https://www.google.com/maps/place/Kathmandu",
      external: true,
    },
  ].map(({ label, href, external }) => (
    <Link
      key={label}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-white/70 no-underline transition hover:text-sky-100"
    >
      {label}
    </Link>
  ))}
</div>

        {/* Platform */}
<div className="flex flex-col gap-2 text-[13px]">
  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Platform</h4>
  {[
    { label: "List your room", href: "/list-room" },
    { label: "Admin dashboard", href: "/owner" },
    { label: "Pricing", href: "/page-pricing" },
  ].map(({ label, href }) => (
    <Link
      key={label}
      href={href}
      className="text-white/70 no-underline transition hover:text-sky-100"
    >
      {label}
    </Link>
  ))}
</div>

        {/* Company */}
        <div className="flex flex-col gap-2 text-[13px]">
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Company</h4>
          {[
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy policy", href: "/privacypolicy" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white/70 no-underline transition hover:text-sky-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-[12px] text-white/60">© 2026 BASOBAS. All rights reserved.</p>
        <div className="flex gap-2 flex-wrap justify-center md:justify-end">
          {["MERN Stack", "Socket.io", "MongoDB"].map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
