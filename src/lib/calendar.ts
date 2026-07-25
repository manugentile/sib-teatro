const CALENDAR_ID = import.meta.env.GOOGLE_CALENDAR_ID;
const API_KEY = import.meta.env.GOOGLE_CALENDAR_API_KEY;

const BASE_URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`;

// Recupera i prossimi 5 eventi
export async function getUpcomingEvents(limit = 5) {
  const now = new Date().toISOString();
  const url = `${BASE_URL}?key=${API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=${limit}`;
  
  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}

// Recupera gli ultimi 5 eventi passati (Archivio)
export async function getPastEvents(limit = 5) {
  const now = new Date().toISOString();
  // Recuperiamo gli eventi passati ordinati per startTime
  const url = `${BASE_URL}?key=${API_KEY}&timeMax=${now}&singleEvents=true&orderBy=startTime`;
  
  const res = await fetch(url);
  const data = await res.json();
  const items = data.items || [];
  
  // Ordiniamo dal più recente al più vecchio e prendiamo i primi N
  return items.reverse().slice(0, limit);
}