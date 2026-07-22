import React from "react";
import { Phone, Mail } from "lucide-react";

// Team data — pulled from the About page team cards
const team = [
  {
    initials: "BL",
    name: "Bipin Lamichhane",
    role: "CEO & Founder",
    phone: "9801122233",
    email: "bipin@basobas.com",
    theme: "blue",
  },
  {
    initials: "YD",
    name: "Yunik Dahal",
    role: "Operations Manager",
    phone: "9806252625",
    email: "yunik@basobas.com",
    theme: "orange",
  },
  {
    initials: "RA",
    name: "Rojit Aryal",
    role: "Head of Listings",
    phone: "9812345655",
    email: "rojit@basobas.com",
    theme: "blue",
  },
  {
    initials: "SP",
    name: "Shreya Parajuli",
    role: "Customer Relations",
    phone: "9866557788",
    email: "shreya@basobas.com",
    theme: "orange",
  },
  {
    initials: "BK",
    name: "Bikash KC",
    role: "Tech Lead",
    phone: "9826578433",
    email: "bikash@basobas.com",
    theme: "blue",
  },
  {
    initials: "KS",
    name: "Kritika Sapkota",
    role: "Marketing Officer",
    phone: "9834554355",
    email: "kritika@basobas.com",
    theme: "orange",
  },
];

const themeStyles = {
  blue: {
    avatarBg: "linear-gradient(180deg, #bfe3fb 0%, #7fc2f2 100%)",
    initialsColor: "#0c4a6e",
    roleColor: "#0284c7",
  },
  orange: {
    avatarBg: "linear-gradient(180deg, #fde3ce 0%, #f7b787 100%)",
    initialsColor: "#9a3412",
    roleColor: "#ea580c",
  },
};

const TeamCard = ({ member }) => {
  const style = themeStyles[member.theme];

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Status dots */}
      <span className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-emerald-500" />
      <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-orange-500" />

      {/* Avatar */}
      <div
        className="mx-auto mb-5 flex h-28 w-24 items-center justify-center rounded-xl text-3xl font-bold"
        style={{ background: style.avatarBg, color: style.initialsColor }}
      >
        {member.initials}
      </div>

      {/* Name & role */}
      <h3 className="text-center text-[15px] font-bold uppercase tracking-wide text-slate-800">
        {member.name}
      </h3>
      <p
        className="mb-4 text-center text-[12px] font-semibold uppercase tracking-wide"
        style={{ color: style.roleColor }}
      >
        {member.role}
      </p>

      <div className="mx-auto mb-4 h-px w-full bg-slate-200" />

      {/* Contact details */}
      <div className="flex flex-col items-center gap-2 text-[13px] text-slate-600">
        <a
          href={`tel:${member.phone}`}
          className="flex items-center gap-2 no-underline transition hover:text-sky-600"
        >
          <Phone size={14} className="text-pink-500" />
          {member.phone}
        </a>
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 no-underline transition hover:text-sky-600"
        >
          <Mail size={14} className="text-violet-500" />
          {member.email}
        </a>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <section className="bg-sky-50 px-8 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-800">Meet the Team</h2>
        <p className="mt-2 text-sm text-slate-500">
          The people behind BASOBAS, here to help you find your next home.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <TeamCard key={member.email} member={member} />
        ))}
      </div>
    </section>
  );
};

export default Team;
