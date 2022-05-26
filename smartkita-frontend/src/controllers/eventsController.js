// const backendurl = "http://localhost:3001/events/";
// const backendurl = "http://vps2290194.fastwebserver.de:9730/events/"
backendurl = "http://" + location.host + "/events/"

//// STADTBUS
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
    backendurl + "stadtbus/ticketinquiry",
    requestOptions
  );
  const data = await response.json();
  this.ticketResponse = data;
}

//// FORUM
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
    backendurl + "forum/calendarentry",
    requestOptions
  );
  const data = await response.json();
  this.calendarResponse = data;
}

export async function forumSendNewsletterPost() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3004,
      event_name: "New Newsletter Post",
      service_name: "kita",
      title: "Noch Kitaplätze frei",
      text_short: "Jetzt zugreifen! Kitaplätze für alle",
      text_long: "Ihr sucht einen Kitaplatz? Kommt in die SmartCity!",
      date: "22.05.2022",
    }),
  };
  const response = await fetch(
    backendurl + "forum/newsletterpost",
    requestOptions
  );
  const data = await response.json();
  this.newsletterResponse = data;
}

//// LANDINGPAGE
export async function landingpageSendChangeAboutUs() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3002,
      event_name: "Updated About US",
      service_name: "kita",
      about_us: "Kita-Service der SmartCity",
      date: "22.05.2022",
    }),
  };
  const response = await fetch(
    backendurl + "landingpage/aboutus",
    requestOptions
  );
  const data = await response.json();
  this.aboutUsResponse = data;
}
