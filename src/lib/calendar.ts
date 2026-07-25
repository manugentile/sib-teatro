const CALENDAR_ID = import.meta.env.PUBLIC_GOOGLE_CALENDAR_ID;
const API_KEY = import.meta.env.PUBLIC_GOOGLE_CALENDAR_API_KEY;

const BASE_URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`;

// Helper per gestire le chiamate ed eventuali errori
async function fetchEvents(params: string) {
  if (!CALENDAR_ID || !API_KEY) {
    console.error("ERRORE: Variabili d'ambiente PUBLIC_GOOGLE_CALENDAR_ID o PUBLIC_GOOGLE_CALENDAR_API_KEY non definite.");
    return [];
  }

  const url = `${BASE_URL}?key=${API_KEY}&${params}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error("Errore risposta Google Calendar API:", data);
      return [];
    }

    return data.items || [];
  } catch (error) {
    console.error("Errore durante la fetch degli eventi:", error);
    return [];
  }
}

// Recupera i prossimi N eventi
export async function getUpcomingEvents(limit = 5) {
  const now = new Date().toISOString();
  
  // singleEvents=true espande gli eventi ricorrenti in singole istanze
  // orderBy=startTime ordina dal più vicino al più lontano nel futuro
  const params = new URLSearchParams({
    timeMin: now,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: limit.toString(),
  });

  return await fetchEvents(params.toString());
}

// Recupera gli ultimi N eventi passati (Archivio)
export async function getPastEvents(limit = 5) {
  const now = new Date().toISOString();
  
  // Per fare in modo che restituisca gli eventi passati PIÙ RECENTI:
  // Usiamo singleEvents=true, timeMax=now
  const params = new URLSearchParams({
    timeMax: now,
    singleEvents: "true",
    orderBy: "startTime",
  });

  const items = await fetchEvents(params.toString());

  // Gli eventi arrivano ordinati dal più vecchio al più recente (fino a "now").
  // Facciamo .reverse() per avere in cima i più recenti e poi prendiamo i primi N.
  return items.reverse().slice(0, limit);
}