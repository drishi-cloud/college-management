import { useState, useCallback } from 'react';

export const useEvents = (initialEvents, initialRegistrations) => {
  const [events, setEvents] = useState(initialEvents);
  const [registrations, setRegistrations] = useState(initialRegistrations);

  const handleRegister = useCallback((eventId) => {
    if (registrations.includes(eventId)) {
      setRegistrations(registrations.filter(id => id !== eventId));
    } else {
      setRegistrations([...registrations, eventId]);
      setEvents(events.map(e => e.id === eventId ? { ...e, registered: e.registered + 1 } : e));
    }
  }, [events, registrations]);

  const createEvent = useCallback((newEventData) => {
    const created = { ...newEventData, id: events.length + 1, registered: 0, status: "upcoming", image: "📌" };
    setEvents([...events, created]);
  }, [events]);

  return {
    events,
    registrations,
    handleRegister,
    createEvent,
    setEvents,
    setRegistrations
  };
};