// location.host doesn't work in local environment so I'm using the comment strat until I find a better solution
// const backendurl = "http://localhost:3001/api/events/";
// const backendurl = "http://vps2290194.fastwebserver.de:9730/events/"
 const backendurl = "http://" + location.host + "/api/events/";

//// STADTBUS
export async function stadtbusSendTicketInquiry(
  number_of_passengers,
  person_responsible,
  kita_responsible,
  date
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3001,
      event_name: "New Kita Inquiry",
      service_name: "kita",
      number_of_passengers: number_of_passengers,
      person_responsible: person_responsible,
      kita_responsible: kita_responsible,
      date: date,
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
export async function forumSendCalendarEntry(
  title,
  short_description,
  long_description,
  date,
  picture_url
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3003,
      event_name: "newServicePost",
      service: "kita",
      title: title,
      short_description: short_description,
      long_description: long_description,
      event_on: date,
      picture_url: picture_url,
    }),
  };
  const response = await fetch(
    backendurl + "forum/calendarentry",
    requestOptions
  );
  const data = await response.json();
  this.calendarResponse = data;
}

export async function forumSendNewsletterPost(
  title,
  short_description,
  long_description,
  picture_url
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3004,
      event_name: "newServicePost",
      service: "kita",
      title: title,
      short_description: short_description,
      long_description: long_description,
      picture_url: picture_url,
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
export async function landingpageSendChangeAboutUs(
  about_us,
  url,
  picture,
  date
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: 3002,
      event_name: "Updated About US",
      service_name: "Kita",
      about_us: about_us,
      url: url,
      picture: picture,
      date: date,
    }),
  };
  const response = await fetch(
    backendurl + "landingpage/aboutus",
    requestOptions
  );
  const data = await response.json();
  console.log(data);
}
