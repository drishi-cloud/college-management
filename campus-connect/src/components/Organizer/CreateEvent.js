import { COLORS } from "../../utils/constants";

export default function CreateEvent({
  newEvent,
  setNewEvent,
  onCreate,
  setView,
  notify,
  isEditing = false,
  onCancelEdit = () => {},
}) {
  const handleSubmit = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.seats) {
      notify("Please fill all required fields", "error");
      return;
    }

    onCreate({
      ...newEvent,
      seats: parseInt(newEvent.seats, 10),
    });

    setNewEvent({
      title: "",
      date: "",
      category: "Technical",
      seats: "",
      desc: "",
      organizer: "CS Dept",
    });
  };

  return (
    <>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, margin: "0 0 4px" }}>
        {isEditing ? "Edit Event" : "Create New Event"}
      </h1>
      <p style={{ color: COLORS.textMuted, margin: "0 0 2rem", fontSize: 15 }}>
        Fill in the event details to publish it for students
      </p>

      <div style={{ background: COLORS.white, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, padding: "2rem", maxWidth: 640 }}>
        <div style={{ display: "grid", gap: 16 }}>
          {[
            ["Event Title *", "title", "text", "e.g. Annual Hackathon 2025"],
            ["Event Date *", "date", "date", ""],
            ["Organizer / Department", "organizer", "text", "e.g. CS Department"],
            ["Total Seats *", "seats", "number", "e.g. 200"],
          ].map(([label, field, type, placeholder]) => (
            <div key={field}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.textPrimary }}>
                {label}
              </label>
              <input
                type={type}
                value={newEvent[field]}
                onChange={(e) => setNewEvent({ ...newEvent, [field]: e.target.value })}
                placeholder={placeholder}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 10,
                  fontSize: 14,
                  boxSizing: "border-box",
                  outline: "none",
                  color: COLORS.textPrimary,
                }}
              />
            </div>
          ))}

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Category
            </label>
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                fontSize: 14,
                background: COLORS.white,
                color: COLORS.textPrimary,
              }}
            >
              {["Technical", "Cultural", "Workshop", "Sports", "Networking"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Description
            </label>
            <textarea
              value={newEvent.desc}
              onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })}
              placeholder="Describe the event..."
              rows={3}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                fontSize: 14,
                resize: "vertical",
                boxSizing: "border-box",
                color: COLORS.textPrimary,
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              background: COLORS.navy,
              color: COLORS.white,
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isEditing ? "Update Event →" : "Publish Event →"}
          </button>

          {isEditing && (
            <button
              onClick={() => {
                onCancelEdit();
                setView("events");
              }}
              style={{
                background: "#F1F5F9",
                color: COLORS.textPrimary,
                border: "none",
                borderRadius: 10,
                padding: "12px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
}