import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import EventList from "./components/Events/EventList";
import MyEvents from "./components/Student/MyEvents";
import CreateEvent from "./components/Organizer/CreateEvent";
import Dashboard from "./components/Admin/Dashboard";
import EventModal from "./components/Events/EventModal";
import Notification from "./components/Notification";
import { COLORS } from "./utils/constants";
import { sampleEvents, studentRegistrations } from "./data/sampleEvents";

export default function App() {
  const [role, setRole] = useState(null);
  const [view, setView] = useState("events");
  const [events, setEvents] = useState(sampleEvents);
  const [registrations, setRegistrations] = useState(studentRegistrations);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    category: "Technical",
    seats: "",
    desc: "",
    organizer: "CS Dept",
  });
  const [editingEvent, setEditingEvent] = useState(null);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRegister = (eventId) => {
    if (registrations.includes(eventId)) {
      setRegistrations((prev) => prev.filter((id) => id !== eventId));
      setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, registered: Math.max(0, e.registered - 1) } : e)));
      notify("Successfully unregistered from event", "info");
    } else {
      setRegistrations((prev) => [...prev, eventId]);
      setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, registered: e.registered + 1 } : e)));
      notify("Registered successfully! ✓");
    }
  };

  const handleCreateEvent = (eventData) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id
            ? { ...e, ...eventData, seats: parseInt(eventData.seats, 10) }
            : e
        )
      );
      setEditingEvent(null);
      notify("Event updated successfully!");
    } else {
      const created = {
        ...eventData,
        id: events.length + 1,
        registered: 0,
        status: "upcoming",
        image: "📌",
      };
      setEvents((prev) => [...prev, created]);
      notify("Event created successfully!");
    }
    setView("events");
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setRegistrations((prev) => prev.filter((id) => id !== eventId));
    if (selectedEvent?.id === eventId) setSelectedEvent(null);
    notify("Event deleted successfully", "info");
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      category: event.category,
      seats: String(event.seats),
      desc: event.desc,
      organizer: event.organizer,
    });
    setView("create");
  };

  if (!role) return <LandingPage onSelect={setRole} />;

  const filteredEvents = (events || []).filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCat === "All" || e.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.textPrimary }}>
      <Navbar role={role} view={view} setView={setView} setRole={setRole} />

      <Notification notification={notification} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {view === "events" && (
          <EventList
            events={filteredEvents}
            registrations={registrations}
            role={role}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterCat={filterCat}
            setFilterCat={setFilterCat}
            onRegister={handleRegister}
            setSelectedEvent={setSelectedEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )}

        {view === "profile" && role === "student" && (
          <MyEvents events={events} registrations={registrations} onViewChange={setView} />
        )}

        {view === "create" && role === "organizer" && (
          <CreateEvent
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            onCreate={handleCreateEvent}
            setView={setView}
            notify={notify}
            isEditing={!!editingEvent}
            onCancelEdit={() => {
              setEditingEvent(null);
              setView("events");
            }}
          />
        )}

        {view === "dashboard" && role === "admin" && (
          <Dashboard events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
        )}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          role={role}
          registrations={registrations}
          onRegister={handleRegister}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
}