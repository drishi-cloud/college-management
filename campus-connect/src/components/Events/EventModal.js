import { COLORS, categoryColors } from "../../utils/constants";

export default function EventModal({
  event,
  registrations = [],
  role,
  onRegister = () => {},
  onClose = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  const isRegistered = registrations.includes(event.id);
  const catStyle = categoryColors[event.category] || { bg: "#F0F0F0", text: "#555" };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,29,58,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 300,
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.white,
          borderRadius: 20,
          maxWidth: 520,
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}, #1E3A6E)`, padding: "2rem", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              borderRadius: 8,
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </button>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{event.image}</div>
          <div style={{ background: catStyle.bg, color: catStyle.text, display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 8 }}>
            {event.category}
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, margin: "0 0 4px" }}>{event.title}</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: 14 }}>Organized by {event.organizer}</p>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <p style={{ color: COLORS.textMuted, lineHeight: 1.7, margin: "0 0 1.25rem" }}>{event.desc}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
            {[
              ["📅 Date", new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
              ["👥 Seats", `${event.registered} / ${event.seats} registered`],
            ].map(([k, v]) => (
              <div key={k} style={{ background: COLORS.bg, borderRadius: 10, padding: "12px" }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {(role === "organizer" || role === "admin") && (
              <>
                <button
                  onClick={() => onEdit(event)}
                  style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: COLORS.teal, color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
                >
                  Edit Event
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: COLORS.coral, color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
                >
                  Delete Event
                </button>
              </>
            )}

            {role === "student" && event.status !== "completed" && (
              <button
                onClick={() => {
                  onRegister(event.id);
                  onClose();
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "none",
                  background: isRegistered ? "#FEE2E2" : COLORS.navy,
                  color: isRegistered ? COLORS.coral : "white",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {isRegistered ? "Unregister from Event" : "Register for This Event →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}