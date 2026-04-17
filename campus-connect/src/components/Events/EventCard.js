import { COLORS, categoryColors } from "../../utils/constants";

export default function EventCard({
  event,
  isRegistered = false,
  onRegister = () => {},
  role,
  onClick = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  const pct = Math.round((event.registered / event.seats) * 100);
  const catStyle = categoryColors[event.category] || { bg: "#F0F0F0", text: "#555" };
  const isFull = event.registered >= event.seats;

  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.white,
        borderRadius: 16,
        border: `1.5px solid ${isRegistered ? COLORS.teal : COLORS.border}`,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: isRegistered ? "0 0 0 3px rgba(13,158,138,0.15)" : "none",
      }}
    >
      <div style={{ background: event.status === "completed" ? "#F1F5F9" : `linear-gradient(135deg, ${COLORS.navy} 0%, #1E3A6E 100%)`, padding: "1.5rem 1.5rem 1rem", position: "relative" }}>
        <span style={{ fontSize: 36 }}>{event.image}</span>
        {isRegistered && <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.teal, color: "white", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>✓ Registered</div>}
        {event.status === "completed" && <div style={{ position: "absolute", top: 12, right: 12, background: "#E2E8F0", color: "#64748B", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Completed</div>}
      </div>

      <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ background: catStyle.bg, color: catStyle.text, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
            {event.category}
          </span>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>📅 {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, margin: "8px 0 4px", color: COLORS.navy }}>{event.title}</h3>
        <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "0 0 12px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {event.desc}
        </p>

        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>
            <span>{event.registered} / {event.seats} seats</span>
            <span style={{ fontWeight: 600, color: pct > 90 ? COLORS.coral : COLORS.teal }}>{pct}% full</span>
          </div>
          <div style={{ background: COLORS.bg, borderRadius: 4, height: 6, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: pct > 90 ? COLORS.coral : COLORS.teal, borderRadius: 4 }} />
          </div>
        </div>

        {role === "student" && event.status !== "completed" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister(event.id);
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 10,
              border: "none",
              background: isRegistered ? "#FEE2E2" : isFull ? "#F1F5F9" : COLORS.navy,
              color: isRegistered ? COLORS.coral : isFull ? "#94A3B8" : COLORS.white,
              fontSize: 14,
              fontWeight: 600,
              cursor: isFull && !isRegistered ? "not-allowed" : "pointer",
            }}
          >
            {isRegistered ? "Unregister" : isFull ? "Event Full" : "Register Now →"}
          </button>
        )}

        {(role === "organizer" || role === "admin") && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(event);
              }}
              style={{ flex: 1, background: COLORS.teal, color: "white", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 600 }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event.id);
              }}
              style={{ flex: 1, background: COLORS.coral, color: "white", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontWeight: 600 }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}