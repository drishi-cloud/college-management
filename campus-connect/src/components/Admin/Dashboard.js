import { COLORS, categoryColors } from "../../utils/constants";

export default function Dashboard({ events = [], onEdit, onDelete }) {
  const stats = [
    ["Total Events", events.length, "📅", COLORS.navy],
    ["Upcoming", events.filter((e) => e.status === "upcoming").length, "🚀", COLORS.teal],
    ["Total Registrations", events.reduce((s, e) => s + e.registered, 0), "👥", COLORS.gold],
    ["Completed", events.filter((e) => e.status === "completed").length, "✅", COLORS.coral],
  ];

  const categoryStats = Object.entries(
    events.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.registered;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>
        Admin Dashboard
      </h1>
      <p style={{ color: COLORS.textMuted, margin: "0 0 2rem", fontSize: 15 }}>
        Monitor all events and participation metrics
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: "2rem" }}>
        {stats.map(([label, val, icon, color]) => (
          <div key={label} style={{ background: COLORS.white, borderRadius: 14, padding: "1.25rem", border: `1.5px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "'Playfair Display', serif" }}>{val}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: COLORS.white, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>All Events Overview</h3>
          <span style={{ fontSize: 13, color: COLORS.textMuted }}>{events.length} events total</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: COLORS.bg }}>
                {["Event", "Date", "Category", "Organizer", "Registrations", "Capacity", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => {
                const pct = Math.round((event.registered / event.seats) * 100);
                return (
                  <tr key={event.id} style={{ borderTop: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : "#FAFBFF" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                      <span style={{ marginRight: 8 }}>{event.image}</span>{event.title}
                    </td>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: (categoryColors[event.category] || {}).bg, color: (categoryColors[event.category] || {}).text, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
                        {event.category}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{event.organizer}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{event.registered}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 60, background: COLORS.bg, borderRadius: 3, height: 5 }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: pct > 90 ? COLORS.coral : COLORS.teal, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: COLORS.textMuted }}>{event.seats}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: event.status === "completed" ? "#F1F5F9" : "#D1FAE5", color: event.status === "completed" ? "#64748B" : "#065F46", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
                        {event.status === "completed" ? "Completed" : "Upcoming"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => onEdit && onEdit(event)}
                          style={{ background: COLORS.teal, color: "white", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 12 }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete && onDelete(event.id)}
                          style={{ background: COLORS.coral, color: "white", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 12 }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1.5rem", background: COLORS.white, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, padding: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem", fontSize: 16, fontWeight: 600 }}>Participation by Category</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {categoryStats.map(([cat, count]) => {
              const total = events.reduce((s, e) => s + e.registered, 0);
              const pct = total ? Math.round((count / total) * 100) : 0;
              const cs = categoryColors[cat] || { bg: "#F0F0F0", text: "#555" };
              return (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 90, fontSize: 13, fontWeight: 500, color: COLORS.textMuted }}>{cat}</span>
                  <div style={{ flex: 1, background: COLORS.bg, borderRadius: 4, height: 10, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: cs.text, borderRadius: 4 }} />
                  </div>
                  <span style={{ width: 40, fontSize: 13, fontWeight: 600, textAlign: "right" }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}