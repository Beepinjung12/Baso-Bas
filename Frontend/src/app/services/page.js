// app/services/page.js
// Place this at: src/app/services/page.js

import {
  FaHome,
  FaComments,
  FaCalendarCheck,
  FaBell,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaHandshake,
  FaKey,
} from "react-icons/fa";

export const metadata = {
  title: "Services",
};

const services = [
  {
    icon: FaHome,
    title: "Verified Room Listings",
    description:
      "Browse thousands of trusted and verified room listings in different locations. Every listing is reviewed before going live.",
    bg: "#e0f2fe",
    iconColor: "#0369a1",
    tag: "Most Popular",
  },
  {
    icon: FaComments,
    title: "Direct Chat",
    description:
      "Communicate directly with room owners using our real-time chat system — no middleman, no delays.",
    bg: "#fff7ed",
    iconColor: "#ea580c",
    tag: null,
  },
  {
    icon: FaCalendarCheck,
    title: "Instant Booking",
    description:
      "Book your room quickly with our secure and easy booking platform. Confirm in minutes, move in on your schedule.",
    bg: "#f0fdf4",
    iconColor: "#16a34a",
    tag: null,
  },
  {
    icon: FaBell,
    title: "Real-time Notifications",
    description:
      "Get instant updates about messages, bookings, and listing changes the moment they happen.",
    bg: "#fdf4ff",
    iconColor: "#9333ea",
    tag: null,
  },
  {
    icon: FaShieldAlt,
    title: "Secure Authentication",
    description:
      "Safe login and signup with secure user authentication. Your data stays private and protected.",
    bg: "#fff1f2",
    iconColor: "#e11d48",
    tag: null,
  },
  {
    icon: FaMapMarkerAlt,
    title: "Location Search",
    description:
      "Easily search rooms by area, city, or nearby locations. Filter by distance, price, and amenities.",
    bg: "#e0f2fe",
    iconColor: "#0369a1",
    tag: null,
  },
];

const steps = [
  {
    icon: FaSearch,
    step: "01",
    title: "Search",
    desc: "Enter your city or area to browse available verified rooms near you.",
  },
  {
    icon: FaHandshake,
    step: "02",
    title: "Connect",
    desc: "Chat directly with the room owner, ask questions, and schedule a visit.",
  },
  {
    icon: FaKey,
    step: "03",
    title: "Move In",
    desc: "Confirm your booking securely and get the keys — it's that simple.",
  },
];

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f9ff", color: "#334155" }}>

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #38bdf8 100%)",
          minHeight: 280,
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
        {/* decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

        <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.8, marginBottom: 14 }}>
          What We Offer
        </p>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            fontWeight: 400,
            marginBottom: 14,
            position: "relative",
          }}
        >
          Our Services
        </h1>
        <div style={{ width: 60, height: 3, background: "#f97316", borderRadius: 2, margin: "0 auto 18px" }} />
        <p style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: 500 }}>
          Everything you need to find, book, and settle into your perfect room — all in one place.
        </p>
      </section>

      {/* ── VISUAL HIGHLIGHT STRIP ── */}
      <section style={{ background: "white", borderBottom: "1px solid #e0f2fe" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "40px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 0,
          }}
        >
          {[
            { emoji: "🏘️", num: "12,000+", label: "Rooms Listed" },
            { emoji: "✅", num: "98%", label: "Verified Owners" },
            { emoji: "⚡", num: "< 5 min", label: "Avg. Booking Time" },
            { emoji: "🌏", num: "20+ Cities", label: "Across Nepal" },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "20px 16px",
                borderRight: i < arr.length - 1 ? "1px solid #e0f2fe" : "none",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1.7rem", fontWeight: 700, color: "#0369a1", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1e3a5f", fontWeight: 600, marginBottom: 10 }}>
            Everything Under One Roof
          </h2>
          <div style={{ width: 50, height: 3, background: "#f97316", borderRadius: 2, margin: "0 auto 14px" }} />
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: 460, margin: "0 auto" }}>
            Six core features designed to make room hunting stress-free from search to move-in.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid #e0f2fe",
                  boxShadow: "0 2px 12px rgba(14,165,233,0.07)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* tag badge */}
                {service.tag && (
                  <span
                    style={{
                      position: "absolute",
                      top: 18,
                      right: 18,
                      background: "#0369a1",
                      color: "white",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderRadius: 20,
                      padding: "3px 10px",
                    }}
                  >
                    {service.tag}
                  </span>
                )}

                {/* decorative corner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: service.bg,
                    opacity: 0.6,
                  }}
                />

                {/* icon */}
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    background: service.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    color: service.iconColor,
                  }}
                >
                  <Icon size={26} />
                </div>

                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#1e3a5f",
                    marginBottom: 10,
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "#64748b" }}>
                  {service.description}
                </p>

                {/* bottom accent line */}
                <div
                  style={{
                    marginTop: 24,
                    height: 3,
                    borderRadius: 2,
                    background: `linear-gradient(to right, ${service.iconColor}44, ${service.iconColor})`,
                    width: "40%",
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "white", borderTop: "1px solid #e0f2fe", borderBottom: "1px solid #e0f2fe" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1e3a5f", fontWeight: 600, marginBottom: 10 }}>
              How It Works
            </h2>
            <div style={{ width: 50, height: 3, background: "#f97316", borderRadius: 2, margin: "0 auto" }} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
              position: "relative",
            }}
          >
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ textAlign: "center", padding: "0 16px" }}>
                  {/* step number + icon */}
                  <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        margin: "0 auto",
                      }}
                    >
                      <Icon size={30} />
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "#f97316",
                        color: "white",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1e3a5f", marginBottom: 8 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "#64748b" }}>{s.desc}</p>

                  {/* connector arrow (not on last) */}
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        display: "none", // shown via CSS on desktop ideally; kept simple here
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0369a1, #0ea5e9)",
          padding: "60px 24px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 400,
            marginBottom: 12,
          }}
        >
          Ready to Find Your Room?
        </h2>
        <p style={{ opacity: 0.88, fontSize: "1rem", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
          Join thousands of happy tenants who found their perfect room on BASOBAS.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/explore"
            style={{
              background: "white",
              color: "#0369a1",
              fontWeight: 700,
              padding: "13px 32px",
              borderRadius: 50,
              textDecoration: "none",
              fontSize: "0.95rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            Browse Rooms
          </a>
          <a
            href="/signup"
            style={{
              background: "#f97316",
              color: "white",
              fontWeight: 700,
              padding: "13px 32px",
              borderRadius: 50,
              textDecoration: "none",
              fontSize: "0.95rem",
              boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
            }}
          >
            Sign Up Free
          </a>
        </div>
      </section>

    </div>
  );
}
