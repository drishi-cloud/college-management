import { COLORS, appBrand } from "../utils/constants";

export default function LandingPage({ onSelect }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: COLORS.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", color: "white", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(245,166,35,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(13,158,138,0.08)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", maxWidth: 600, position: "relative" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 1.5rem" }}>
          {appBrand.icon}
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 800, margin: "0 0 0.5rem", lineHeight: 1.1 }}>
          {appBrand.name}
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", margin: "0 0 0.5rem" }}>College Event Management System</p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", margin: "0 0 3rem", maxWidth: 420, marginInline: "auto" }}>
          Streamlining event planning, registration, and participation tracking for your entire campus.
        </p>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "1rem" }}>
          Continue as
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { role: "student", icon: "🎒", title: "Student", desc: "Browse and register for college events" },
            { role: "organizer", icon: "📋", title: "Organizer", desc: "Create and manage department events" },
            { role: "admin", icon: "⚙️", title: "Admin", desc: "Monitor and oversee all activities" },
          ].map(({ role, icon, title, desc }) => (
            <button
              key={role}
              onClick={() => onSelect(role)}
              style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "1.5rem 1rem", cursor: "pointer", color: "white", textAlign: "center", transition: "all 0.2s", backdropFilter: "blur(10px)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{desc}</div>
            </button>
          ))}
        </div>

        <p style={{ marginTop: "2rem", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Demo app — click any role to explore</p>
      </div>
    </div>
  );
}