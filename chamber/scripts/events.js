export async function getEvents () {

async function getEvents() {
  try {
    const response = await fetch("data/events.json");
    if (!response.ok) {
      throw new Error("Event data not available");
    }
    const events = await response.json();
    let htmlContent = "";
    events.forEach((event) => {
      htmlContent += `
                <div class="member-card event-card">
						<div class="event-badge">${event.category}</div>
						<h3>${event.title}</h3>
						<div class="event-meta">
							<p><strong>📅</strong> ${event.date}</p>
							<p><strong>🕐</strong> ${event.time}</p>
							<p><strong>📍</strong> ${event.location}</p>
						</div>
						<p class="event-description">${event.description}</p>
						<a href="events.html" class="event-link">Learn More →</a>
				</div>`;
    });
    const eventContainer = document.getElementById("events-grid");
    eventContainer.innerHTML = htmlContent;
  } catch (error) {
    const eventContainer = document.getElementById("events-grid");
    eventContainer.innerHTML = "Event data not available";
  }
}
getEvents();

}
