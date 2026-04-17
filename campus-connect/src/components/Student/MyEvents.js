import { COLORS, categoryColors } from "../../utils/constants";

export default function MyEvents({ events = [], registrations = [], onViewChange = () => {} }) {
  const myEvents = events.filter((e) => registrations.includes(e.id));

  return (
    <>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>
        My Registrations
      </h1>
      <p style={{ color: COLORS.textMuted, margin: "0 0 2rem", fontSize: 15 }}>
        {registrations.length} events registered
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {myEvents.map((event) => (
          <div
            key={event.id}
            style={{
              background: COLORS.white,
              borderRadius: 14,
              border: `1.5px solid ${COLORS.teal}`,
              padding: "1.25rem",
              boxShadow: "0 0 0 3px rgba(13,158,138,0.1)",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: 32, lineHeight: 1 }}>{event.image}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "0 0 8px" }}>
                  📅 {new Date(event.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
                    ✓ Confirmed
                  </span>
                  <span style={{ background: (categoryColors[event.category] || {}).bg, color: (categoryColors[event.category] || {}).text, fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>
                    {event.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {myEvents.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: COLORS.textMuted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <p style={{ fontSize: 16 }}>You haven't registered for any events yet.</p>
            <button
              onClick={() => onViewChange("events")}
              style={{
                marginTop: 12,
                background: COLORS.navy,
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Browse Events →
            </button>
          </div>
        )}
      </div>
    </>
  );
}