// app/about/page.jsx

import TeamCard from "./teamcard";

export const metadata = {
  title: "About",
};

const teamMembers = [
  { name: "Bipin Lamichhane ", role: "CEO & Founder", phone: "9801122233", email: "bipin@basobas.com", initials: "BL", color: "#0ea5e9" },
  { name: "Yunik Dahal", role: "Operations Manager", phone: "9806252625", email: "yunik@basobas.com", initials: "YD", color: "#f97316" },
  { name: "Rojit Aryal", role: "Head of Listings", phone: "9812345655", email: "rojit@basobas.com", initials: "RA", color: "#0ea5e9" },
  { name: "Shreya Parajuli", role: "Customer Relations", phone: "9866557788", email: "shreya@basobas.com", initials: "SP", color: "#f97316" },
  { name: "Bikash KC", role: "Tech Lead", phone: "9826578433", email: "bikash@basobas.com", initials: "BK", color: "#0ea5e9" },
  { name: "Kritika Sapkota", role: "Marketing Officer", phone: "9834554355", email: "kritika@basobas.com", initials: "KS", color: "#f97316" },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f9ff", color: "#334155" }}>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #38bdf8 100%)",
          minHeight: 260,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "70px 24px 60px",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 400, marginBottom: 12, position: "relative" }}>
          About BASOBAS
        </h1>
        <div style={{ width: 60, height: 3, background: "#f97316", borderRadius: 2, margin: "0 auto 16px" }} />
        <p style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: 480 }}>
          Your trusted room rental and booking platform
        </p>
      </section>

      {/* COMPANY INTRO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div style={{ background: "linear-gradient(135deg, #e0f2fe, #bae6fd)", borderRadius: 20, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", border: "1px solid #bae6fd" }}>
            🏠
          </div>
          <div>
            <p style={{ color: "#f97316", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
              Company Introduction
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1e3a5f", fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
              All Your Needs, One Trusted Link
            </h2>
            <div style={{ width: 50, height: 3, background: "#f97316", borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#64748b", marginBottom: 14 }}>
              BASOBAS is a modern room rental platform designed to help students, travelers, and professionals find the perfect room effortlessly.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#64748b", marginBottom: 14 }}>
              We focus on verified listings, secure communication, and instant booking to make the process simple and trustworthy.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#64748b" }}>
              Our mission is to make room hunting easy, fast, and safe for everyone — under one roof.
            </p>
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Room Rentals", "Verified Listings", "Instant Booking", "24/7 Support", "Secure Payments"].map((s) => (
                <span key={s} style={{ background: "#e0f2fe", color: "#0369a1", borderRadius: 20, padding: "4px 14px", fontSize: "0.78rem", fontWeight: 600, border: "1px solid #bae6fd" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            { icon: "🏘️", stat: "12,000+", label: "Verified Listings", sub: "Rooms available across cities" },
            { icon: "✅", stat: "98%", label: "Verified Owners", sub: "Identity-confirmed landlords" },
            { icon: "🕐", stat: "24/7", label: "Customer Support", sub: "Always here when you need us" },
            { icon: "🤝", stat: "5,000+", label: "Happy Tenants", sub: "Successful matches made" },
          ].map((c) => (
            <div key={c.label} style={{ background: "white", borderRadius: 16, padding: "28px 22px", boxShadow: "0 2px 12px rgba(14,165,233,0.09)", border: "1px solid #e0f2fe", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#0369a1", marginBottom: 4 }}>{c.stat}</div>
              <div style={{ fontWeight: 700, color: "#1e3a5f", fontSize: "0.9rem", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR TEAM */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#1e3a5f", fontWeight: 600, marginBottom: 10 }}>
            Our Team
          </h2>
          <div style={{ width: 60, height: 3, background: "#f97316", borderRadius: 2, margin: "0 auto 16px" }} />
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: 480, margin: "0 auto" }}>
            Meet the dedicated people behind BASOBAS who work hard to make your room search effortless.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
          {teamMembers.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </section>

    </div>
  );
}
