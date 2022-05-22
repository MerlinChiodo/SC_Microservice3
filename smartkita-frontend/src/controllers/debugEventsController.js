// STADTBUS
export async function stadtbusSendTicketInquiry() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3001,
      event_name: "New Kita Inquiry",
      service_name: "kita",
      number_of_passengers: 999,
      person_responsible: "Hans Merkel",
      date: "08.05.2022",
    }),
  };
  const response = await fetch(
    `http://localhost:3001/events/stadtbus/ticketinquiry`,
    requestOptions
  );
  const data = await response.json();
  this.ticketResponse = data;
}

// FORUM
export async function forumSendCalendarEntry() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3003,
      event_name: "New Calendar Entry",
      service_name: "kita",
      title: "Tag der offenen Tür",
      text_short: "Smarte Events in der Kita",
      text_long:
        "Taucht ein in die digitale Welt der SmartCity! Euch erwarten exklusive Einblicke in eine Reihe von Front- und Backends.",
      date: "01.01.2025",
    }),
  };
  const response = await fetch(
      `http://localhost:3001/events/forum/calendarentry`,
      requestOptions
  );
  const data = await response.json();
  this.calendarResponse = data;
}

// LANDINGPAGE
export async function landingpageSendChangeAboutUs() {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            event_id: 3002,
            event_name: "Updated About US",
            service_name: "kita",
            title: "Tag der offenen Tür",
            text_short: "Smarte Events in der Kita",
            text_long:
                "Taucht ein in die digitale Welt der SmartCity! Euch erwarten exklusive Einblicke in eine Reihe von Front- und Backends.",
            date: "01.01.2025",
        }),
    };
    const response = await fetch(
        `http://localhost:3001/events/landingpage/aboutus`,
        requestOptions
    );
    const data = await response.json();
    this.aboutUsResponse = data;
}
