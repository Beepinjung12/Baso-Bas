"use client";

export default function TeamCard({ member }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(14,165,233,0.10)",
        border: "1px solid #e0f2fe",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 0 24px 0",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,0.18)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(14,165,233,0.10)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent dots */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 16px 0 16px",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
      </div>

      {/* Avatar */}
      <div
        style={{
          width: 110,
          height: 130,
          borderRadius: "12px",
          background: `linear-gradient(135deg, ${member.color}22, ${member.color}55)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "12px 0 18px 0",
          border: `2px solid ${member.color}33`,
          fontSize: "2.2rem",
          fontWeight: 700,
          color: member.color,
          letterSpacing: "0.05em",
          fontFamily: "Georgia, serif",
        }}
      >
        {member.initials}
      </div>

      {/* Name & Role */}
      <h3
        style={{
          fontWeight: 700,
          fontSize: "1rem",
          color: "#1e3a5f",
          textAlign: "center",
          margin: "0 12px 4px",
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        {member.name}
      </h3>
      <p
        style={{
          color: "#f97316",
          fontWeight: 600,
          fontSize: "0.78rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "14px",
          textAlign: "center",
          padding: "0 8px",
        }}
      >
        {member.role}
      </p>

      {/* Gradient divider */}
      <div
        style={{
          width: "80%",
          height: 1,
          background: "linear-gradient(to right, #0ea5e9, #f97316)",
          marginBottom: "14px",
          borderRadius: 2,
        }}
      />

      {/* Phone */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#475569", marginBottom: 6 }}>
        <span>📞</span> {member.phone}
      </div>

      {/* Email */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#475569" }}>
        <span>✉️</span> {member.email}
      </div>
    </div>
  );
}
