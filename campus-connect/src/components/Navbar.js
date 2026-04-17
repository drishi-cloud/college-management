import { COLORS, appBrand } from "../utils/constants";

export default function Navbar({ role, view, setView, setRole }) {
  const navItems = [
    ["events", "Events"],
    ...(role === "organizer" ? [["create", "Create Event"]] : []),
    ...(role === "admin" ? [["dashboard", "Dashboard"]] : []),
    ...(role === "student" ? [["profile", "My Events"]] : []),
  ];

  return (
    <nav style={{ background: COLORS.navy, padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(11,29,58,0.3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
          {appBrand.icon}
        </div>
        <span style={{ fontFamily: "'Playfair Display', serif", color: COLORS.white, fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px" }}>
          {appBrand.name}
        </span>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {navItems.map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              background: view === v ? COLORS.gold : "transparent",
              color: view === v ? COLORS.navy : "rgba(255,255,255,0.75)",
              border: "none",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: view === v ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: role === "admin" ? COLORS.coral : role === "organizer" ? COLORS.teal : COLORS.gold, color: COLORS.navy, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>
          {role}
        </div>
        <button
          onClick={() => {
            setRole(null);
            setView("events");
          }}
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}