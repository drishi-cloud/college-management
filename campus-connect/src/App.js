import { useState } from "react";

const COLORS = {
  navy: "#0B1D3A",
  navyLight: "#162B54",
  gold: "#F5A623",
  goldLight: "#FFD580",
  teal: "#0D9E8A",
  tealLight: "#B2EDE7",
  coral: "#E8533A",
  bg: "#F4F6FB",
  white: "#FFFFFF",
  textPrimary: "#0B1D3A",
  textMuted: "#6B7A99",
  border: "#DDE3F0",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
`;

const sampleEvents = [
  { id: 1, title: "Annual Tech Fest 2025", date: "2025-05-15", category: "Technical", organizer: "CS Dept", seats: 200, registered: 143, status: "upcoming", desc: "A celebration of technology, innovation, and student talent across all engineering disciplines.", image: "🖥️" },
  { id: 2, title: "Cultural Extravaganza", date: "2025-05-22", category: "Cultural", organizer: "Arts Club", seats: 500, registered: 487, status: "upcoming", desc: "An evening of music, dance, and drama performances from students of all streams.", image: "🎭" },
  { id: 3, title: "Entrepreneurship Summit", date: "2025-06-01", category: "Workshop", organizer: "Business Cell", seats: 150, registered: 89, status: "upcoming", desc: "Inspiring talks from startup founders, investors, and industry leaders.", image: "🚀" },
  { id: 4, title: "Sports Day 2025", date: "2025-04-10", category: "Sports", organizer: "Sports Comm.", seats: 300, registered: 300, status: "completed", desc: "Annual inter-department sports competition with multiple disciplines.", image: "🏅" },
  { id: 5, title: "Alumni Meet & Greet", date: "2025-06-20", category: "Networking", organizer: "Admin", seats: 250, registered: 34, status: "upcoming", desc: "Connect with alumni from across the globe for mentorship and networking.", image: "🤝" },
  { id: 6, title: "Hackathon 24hrs", date: "2025-07-05", category: "Technical", organizer: "Innovation Lab", seats: 120, registered: 67, status: "upcoming", desc: "24-hour coding challenge to build solutions for real-world problems.", image: "⚡" },
];

const studentRegistrations = [1, 3];

const categoryColors = {
  Technical: { bg: "#E8F0FE", text: "#2952CC" },
  Cultural: { bg: "#FDE8F5", text: "#9B2B78" },
  Workshop: { bg: "#E8FAF4", text: "#0D7A5F" },
  Sports: { bg: "#FFF3E0", text: "#B35A00" },
  Networking: { bg: "#F0EDFF", text: "#5533CC" },
};

export default function App() {
  const [role, setRole] = useState(null); // "student" | "organizer" | "admin"
  const [view, setView] = useState("events"); // events | dashboard | create | profile
  const [events, setEvents] = useState(sampleEvents);
  const [registrations, setRegistrations] = useState(studentRegistrations);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", category: "Technical", seats: "", desc: "", organizer: "CS Dept" });

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRegister = (eventId) => {
    if (registrations.includes(eventId)) {
      setRegistrations(registrations.filter(id => id !== eventId));
      notify("Successfully unregistered from event", "info");
    } else {
      setRegistrations([...registrations, eventId]);
      setEvents(events.map(e => e.id === eventId ? { ...e, registered: e.registered + 1 } : e));
      notify("Registered successfully! ✓");
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.seats) {
      notify("Please fill all required fields", "error");
      return;
    }
    const created = { ...newEvent, id: events.length + 1, registered: 0, status: "upcoming", image: "📌", seats: parseInt(newEvent.seats) };
    setEvents([...events, created]);
    setNewEvent({ title: "", date: "", category: "Technical", seats: "", desc: "", organizer: "CS Dept" });
    setView("events");
    notify("Event created successfully!");
  };

  const filteredEvents = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCat === "All" || e.category === filterCat;
    return matchSearch && matchCat;
  });

  const categories = ["All", "Technical", "Cultural", "Workshop", "Sports", "Networking"];

  if (!role) {
    return <LandingPage onSelect={setRole} />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.textPrimary }}>
      <style>{FONTS}</style>

      {/* Navbar */}
      <nav style={{ background: COLORS.navy, padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(11,29,58,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
          <span style={{ fontFamily: "'Playfair Display', serif", color: COLORS.white, fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px" }}>CampusConnect</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["events", "Events"], ...(role === "organizer" ? [["create", "Create Event"]] : []), ...(role === "admin" ? [["dashboard", "Dashboard"]] : []), ...(role === "student" ? [["profile", "My Events"]] : [])].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} style={{ background: view === v ? COLORS.gold : "transparent", color: view === v ? COLORS.navy : "rgba(255,255,255,0.75)", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: view === v ? 600 : 400, transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: role === "admin" ? COLORS.coral : role === "organizer" ? COLORS.teal : COLORS.gold, color: COLORS.navy, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{role}</div>
          <button onClick={() => { setRole(null); setView("events"); }} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>Sign out</button>
        </div>
      </nav>

      {notification && (
        <div style={{ position: "fixed", top: 80, right: 24, background: notification.type === "error" ? "#FEE2E2" : notification.type === "info" ? "#E0F2FE" : "#D1FAE5", color: notification.type === "error" ? "#991B1B" : notification.type === "info" ? "#0369A1" : "#065F46", padding: "12px 20px", borderRadius: 10, fontWeight: 500, fontSize: 14, zIndex: 200, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", animation: "fadeIn 0.3s ease" }}>
          {notification.msg}
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Events View */}
        {view === "events" && (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px", color: COLORS.navy }}>
                {role === "student" ? "Discover Events" : role === "organizer" ? "Manage Events" : "All Events"}
              </h1>
              <p style={{ color: COLORS.textMuted, margin: 0, fontSize: 15 }}>
                {role === "student" ? "Browse and register for upcoming college events" : role === "organizer" ? "View and track your created events" : "Monitor all events across departments"}
              </p>
            </div>

            {/* Search + Filter */}
            <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="🔍  Search events..." style={{ flex: 1, minWidth: 200, padding: "10px 16px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: COLORS.white, color: COLORS.textPrimary, outline: "none" }} />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "8px 14px", borderRadius: 20, border: filterCat === cat ? "none" : `1.5px solid ${COLORS.border}`, background: filterCat === cat ? COLORS.navy : COLORS.white, color: filterCat === cat ? COLORS.white : COLORS.textMuted, fontSize: 13, cursor: "pointer", fontWeight: filterCat === cat ? 600 : 400, transition: "all 0.2s" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
              {filteredEvents.map(event => {
                const isRegistered = registrations.includes(event.id);
                const pct = Math.round((event.registered / event.seats) * 100);
                const catStyle = categoryColors[event.category] || { bg: "#F0F0F0", text: "#555" };
                const isFull = event.registered >= event.seats;
                return (
                  <div key={event.id} onClick={() => setSelectedEvent(event)} style={{ background: COLORS.white, borderRadius: 16, border: `1.5px solid ${isRegistered ? COLORS.teal : COLORS.border}`, overflow: "hidden", cursor: "pointer", transition: "all 0.25s", boxShadow: isRegistered ? "0 0 0 3px rgba(13,158,138,0.15)" : "none" }}>
                    <div style={{ background: event.status === "completed" ? "#F1F5F9" : `linear-gradient(135deg, ${COLORS.navy} 0%, #1E3A6E 100%)`, padding: "1.5rem 1.5rem 1rem", position: "relative" }}>
                      <span style={{ fontSize: 36 }}>{event.image}</span>
                      {isRegistered && <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.teal, color: "white", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>✓ Registered</div>}
                      {event.status === "completed" && <div style={{ position: "absolute", top: 12, right: 12, background: "#E2E8F0", color: "#64748B", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Completed</div>}
                    </div>
                    <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <span style={{ background: catStyle.bg, color: catStyle.text, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{event.category}</span>
                        <span style={{ fontSize: 12, color: COLORS.textMuted }}>📅 {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, margin: "8px 0 4px", color: COLORS.navy }}>{event.title}</h3>
                      <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "0 0 12px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{event.desc}</p>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>
                          <span>{event.registered} / {event.seats} seats</span>
                          <span style={{ fontWeight: 600, color: pct > 90 ? COLORS.coral : COLORS.teal }}>{pct}% full</span>
                        </div>
                        <div style={{ background: COLORS.bg, borderRadius: 4, height: 6, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: pct > 90 ? COLORS.coral : COLORS.teal, borderRadius: 4, transition: "width 0.5s" }} />
                        </div>
                      </div>
                      {role === "student" && event.status !== "completed" && (
                        <button onClick={e => { e.stopPropagation(); handleRegister(event.id); }} style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: isRegistered ? "#FEE2E2" : isFull ? "#F1F5F9" : COLORS.navy, color: isRegistered ? COLORS.coral : isFull ? "#94A3B8" : COLORS.white, fontSize: 14, fontWeight: 600, cursor: isFull && !isRegistered ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
                          {isRegistered ? "Unregister" : isFull ? "Event Full" : "Register Now →"}
                        </button>
                      )}
                      {(role === "organizer" || role === "admin") && (
                        <div style={{ display: "flex", gap: 8 }}>
                          <div style={{ flex: 1, background: COLORS.bg, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy }}>{event.registered}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>Registered</div>
                          </div>
                          <div style={{ flex: 1, background: COLORS.bg, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.teal }}>{event.seats - event.registered}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>Remaining</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Student My Events */}
        {view === "profile" && role === "student" && (
          <>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>My Registrations</h1>
            <p style={{ color: COLORS.textMuted, margin: "0 0 2rem", fontSize: 15 }}>{registrations.length} events registered</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {events.filter(e => registrations.includes(e.id)).map(event => (
                <div key={event.id} style={{ background: COLORS.white, borderRadius: 14, border: `1.5px solid ${COLORS.teal}`, padding: "1.25rem", boxShadow: "0 0 0 3px rgba(13,158,138,0.1)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 32, lineHeight: 1 }}>{event.image}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>{event.title}</h3>
                      <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "0 0 8px" }}>📅 {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>✓ Confirmed</span>
                        <span style={{ background: (categoryColors[event.category] || {}).bg, color: (categoryColors[event.category] || {}).text, fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>{event.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {registrations.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: COLORS.textMuted }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                  <p style={{ fontSize: 16 }}>You haven't registered for any events yet.</p>
                  <button onClick={() => setView("events")} style={{ marginTop: 12, background: COLORS.navy, color: "white", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>Browse Events →</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Organizer Create Event */}
        {view === "create" && role === "organizer" && (
          <>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>Create New Event</h1>
            <p style={{ color: COLORS.textMuted, margin: "0 0 2rem", fontSize: 15 }}>Fill in the event details to publish it for students</p>
            <div style={{ background: COLORS.white, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, padding: "2rem", maxWidth: 640 }}>
              <div style={{ display: "grid", gap: 16 }}>
                {[["Event Title *", "title", "text", "e.g. Annual Hackathon 2025"], ["Event Date *", "date", "date", ""], ["Organizer / Department", "organizer", "text", "e.g. CS Department"], ["Total Seats *", "seats", "number", "e.g. 200"]].map(([label, field, type, placeholder]) => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.textPrimary }}>{label}</label>
                    <input type={type} value={newEvent[field]} onChange={e => setNewEvent({ ...newEvent, [field]: e.target.value })} placeholder={placeholder} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box", outline: "none", color: COLORS.textPrimary }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Category</label>
                  <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: COLORS.white, color: COLORS.textPrimary }}>
                    {["Technical", "Cultural", "Workshop", "Sports", "Networking"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</label>
                  <textarea value={newEvent.desc} onChange={e => setNewEvent({ ...newEvent, desc: e.target.value })} placeholder="Describe the event..." rows={3} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "vertical", boxSizing: "border-box", color: COLORS.textPrimary }} />
                </div>
                <button onClick={handleCreateEvent} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 10, padding: "12px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}>
                  Publish Event →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Admin Dashboard */}
        {view === "dashboard" && role === "admin" && (
          <>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>Admin Dashboard</h1>
            <p style={{ color: COLORS.textMuted, margin: "0 0 2rem", fontSize: 15 }}>Monitor all events and participation metrics</p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: "2rem" }}>
              {[
                ["Total Events", events.length, "📅", COLORS.navy],
                ["Upcoming", events.filter(e => e.status === "upcoming").length, "🚀", COLORS.teal],
                ["Total Registrations", events.reduce((s, e) => s + e.registered, 0), "👥", COLORS.gold],
                ["Completed", events.filter(e => e.status === "completed").length, "✅", COLORS.coral],
              ].map(([label, val, icon, color]) => (
                <div key={label} style={{ background: COLORS.white, borderRadius: 14, padding: "1.25rem", border: `1.5px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "'Playfair Display', serif" }}>{val}</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Event Table */}
            <div style={{ background: COLORS.white, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, overflow: "hidden" }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>All Events Overview</h3>
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>{events.length} events total</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: COLORS.bg }}>
                      {["Event", "Date", "Category", "Organizer", "Registrations", "Capacity", "Status"].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
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
                          <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ background: (categoryColors[event.category] || {}).bg, color: (categoryColors[event.category] || {}).text, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{event.category}</span>
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Breakdown */}
            <div style={{ marginTop: "1.5rem", background: COLORS.white, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, padding: "1.5rem" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: 16, fontWeight: 600 }}>Participation by Category</h3>
              <div style={{ display: "grid", gap: 10 }}>
                {Object.entries(
                  events.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.registered; return acc; }, {})
                ).sort((a, b) => b[1] - a[1]).map(([cat, count]) => {
                  const total = events.reduce((s, e) => s + e.registered, 0);
                  const pct = Math.round((count / total) * 100);
                  const cs = categoryColors[cat] || { bg: "#F0F0F0", text: "#555" };
                  return (
                    <div key={cat} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 90, fontSize: 13, fontWeight: 500, color: COLORS.textMuted }}>{cat}</span>
                      <div style={{ flex: 1, background: COLORS.bg, borderRadius: 4, height: 10, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: cs.text, borderRadius: 4, transition: "width 0.6s" }} />
                      </div>
                      <span style={{ width: 40, fontSize: 13, fontWeight: 600, textAlign: "right" }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: "fixed", inset: 0, background: "rgba(11,29,58,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, maxWidth: 520, width: "100%", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}, #1E3A6E)`, padding: "2rem", position: "relative" }}>
              <button onClick={() => setSelectedEvent(null)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{selectedEvent.image}</div>
              <div style={{ background: (categoryColors[selectedEvent.category] || {}).bg, color: (categoryColors[selectedEvent.category] || {}).text, display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 8 }}>{selectedEvent.category}</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, margin: "0 0 4px" }}>{selectedEvent.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: 14 }}>Organized by {selectedEvent.organizer}</p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <p style={{ color: COLORS.textMuted, lineHeight: 1.7, margin: "0 0 1.25rem" }}>{selectedEvent.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
                {[["📅 Date", new Date(selectedEvent.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })], ["👥 Seats", `${selectedEvent.registered} / ${selectedEvent.seats} registered`]].map(([k, v]) => (
                  <div key={k} style={{ background: COLORS.bg, borderRadius: 10, padding: "12px" }}>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
              {role === "student" && selectedEvent.status !== "completed" && (
                <button onClick={() => { handleRegister(selectedEvent.id); setSelectedEvent(null); }} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: registrations.includes(selectedEvent.id) ? "#FEE2E2" : COLORS.navy, color: registrations.includes(selectedEvent.id) ? COLORS.coral : "white", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  {registrations.includes(selectedEvent.id) ? "Unregister from Event" : "Register for This Event →"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { opacity: 0.9; }
        input:focus, textarea:focus, select:focus { border-color: ${COLORS.navy} !important; box-shadow: 0 0 0 3px rgba(11,29,58,0.1); }
      `}</style>
    </div>
  );
}

function LandingPage({ onSelect }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: COLORS.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", color: "white", position: "relative", overflow: "hidden" }}>
      <style>{FONTS}</style>

      {/* Background decoration */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(245,166,35,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(13,158,138,0.08)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", maxWidth: 600, position: "relative" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 1.5rem" }}>🎓</div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 800, margin: "0 0 0.5rem", lineHeight: 1.1 }}>CampusConnect</h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", margin: "0 0 0.5rem" }}>College Event Management System</p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", margin: "0 0 3rem", maxWidth: 420, marginInline: "auto" }}>Streamlining event planning, registration, and participation tracking for your entire campus.</p>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "1rem" }}>Continue as</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { role: "student", icon: "🎒", title: "Student", desc: "Browse and register for college events" },
            { role: "organizer", icon: "📋", title: "Organizer", desc: "Create and manage department events" },
            { role: "admin", icon: "⚙️", title: "Admin", desc: "Monitor and oversee all activities" },
          ].map(({ role, icon, title, desc }) => (
            <button key={role} onClick={() => onSelect(role)} style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "1.5rem 1rem", cursor: "pointer", color: "white", textAlign: "center", transition: "all 0.2s", backdropFilter: "blur(10px)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
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
