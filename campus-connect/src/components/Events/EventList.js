import { COLORS, categories, categoryColors } from "../../utils/constants";
import EventCard from "./EventCard";

export default function EventList({
  events = [],
  registrations = [],
  role,
  searchQuery,
  setSearchQuery,
  filterCat,
  setFilterCat,
  onRegister,
  setSelectedEvent,
  onEdit = () => {},
  onDelete = () => {},
}) {
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px", color: COLORS.navy }}>
          {role === "student" ? "Discover Events" : role === "organizer" ? "Manage Events" : "All Events"}
        </h1>
        <p style={{ color: COLORS.textMuted, margin: 0, fontSize: 15 }}>
          {role === "student"
            ? "Browse and register for upcoming college events"
            : role === "organizer"
            ? "View and track your created events"
            : "Monitor all events across departments"}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search events..."
          style={{
            flex: 1,
            minWidth: 200,
            padding: "10px 16px",
            border: `1.5px solid ${COLORS.border}`,
            borderRadius: 10,
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            background: COLORS.white,
            color: COLORS.textPrimary,
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: filterCat === cat ? "none" : `1.5px solid ${COLORS.border}`,
                background: filterCat === cat ? COLORS.navy : COLORS.white,
                color: filterCat === cat ? COLORS.white : COLORS.textMuted,
                fontSize: 13,
                cursor: "pointer",
                fontWeight: filterCat === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isRegistered={registrations.includes(event.id)}
            role={role}
            onRegister={onRegister}
            onClick={() => setSelectedEvent(event)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}