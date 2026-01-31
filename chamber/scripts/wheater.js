// ================================= DOM ELEMENTS =================================
const weatherContainer = document.getElementById("weather-data");
const eventsContainer = document.getElementById("events-grid");
const spotlightsContainer = document.getElementById("spotlights-grid");
// ================================= EVENT LISTENERS =================================
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  fetchWeather();
  loadEvents();
  loadSpotlights();
});

// ================================= MOBILE MENU =================================
function setupMobileMenu() {
  if (!navToggle || !nav) return;

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Toggle navigation");

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !isExpanded);
    nav.classList.toggle("active");
  });
}

// ================================= WEATHER API =================================
async function fetchWeather() {
  if (!weatherContainer) return;

  try {
    const apiKey = "3852d9f4709ed7512872d272062eecf3";
    const city = "Queretaro";
    const units = "metric";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=en`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // formatting date and hour
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    weatherContainer.innerHTML = `
      <div class="weather-card">
        <div class="weather-header">
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>${dateString} • ${timeString}</p>
        </div>
        <div class="weather-main">
          <div class="weather-icon">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                  alt="${data.weather[0].description}">
          </div>
          <div class="weather-temp">
            <span class="temp">${Math.round(data.main.temp)}°C</span>
            <span class="condition">${data.weather[0].description}</span>
          </div>
        </div>
        <div class="weather-details">
          <div class="detail">
            <span class="label">💧 Humidity:</span>
            <span class="value">${data.main.humidity}%</span>
          </div>
          <div class="detail">
            <span class="label">💨 Wind:</span>
            <span class="value">${Math.round(data.wind.speed * 3.6)} km/h</span>
          </div>
          <div class="detail">
            <span class="label">🌡️ Feels like:</span>
            <span class="value">${Math.round(data.main.feels_like)}°C</span>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherContainer.innerHTML = `
      <div class="weather-error">
        <p style="color: #e74c3c; margin: 0;">
          🌤️ Weather data temporarily unavailable. Please try again later.
        </p>
        <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.5rem;">
          Error: ${error.message}
        </p>
      </div>
    `;
  }
}

// ================================= EVENTS DATA =================================
function loadEvents() {
  if (!eventsContainer) return;

  const events = [
    {
      title: "Business Networking Mixer",
      date: "Feb 15, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Querétaro Convention Center",
      description:
        "Connect with local business leaders and entrepreneurs. Light refreshments provided.",
      category: "Networking",
    },
    {
      title: "Export Workshop: Going Global",
      date: "Mar 5, 2026",
      time: "9:00 AM - 12:00 PM",
      location: "Chamber Office - Conference Room A",
      description:
        "Learn strategies for international market expansion and export compliance.",
      category: "Education",
    },
    {
      title: "Annual Gala Dinner",
      date: "Apr 20, 2026",
      time: "7:00 PM - 11:00 PM",
      location: "Hotel Grand Querétaro",
      description:
        "Celebrate excellence in local business. Black tie optional. RSVP required.",
      category: "Special Event",
    },
  ];

  eventsContainer.innerHTML = events
    .map(
      (event) => `
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
    </div>
  `,
    )
    .join("");
}

// ================================= SPOTLIGHTS DATA =================================
async function loadSpotlights() {
  if (!spotlightsContainer) return;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();

    // Filter Gold members and silver
    const premiumMembers = members.filter(
      (member) => member.membershipLevel === 3 || member.membershipLevel === 2,
    );

    // Selects three random members
    const spotlights = [];
    const usedIndices = new Set();

    while (spotlights.length < 3 && spotlights.length < premiumMembers.length) {
      const randomIndex = Math.floor(Math.random() * premiumMembers.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        spotlights.push(premiumMembers[randomIndex]);
      }
    }

    // Render Spotlight
    spotlightsContainer.innerHTML = spotlights
      .map(
        (member) => `
      <div class="member-card spotlight-card">
        <div class="spotlight-badge">
          ${getMembershipBadge(member.membershipLevel)}
        </div>
        <img src="images/${member.image}" 
              alt="${member.name} logo" 
              loading="lazy" 
              onerror="this.src='images/placeholder.jpg'; this.alt='Image not available';" />
        <h3>${member.name}</h3>
        <div class="spotlight-meta">
          <span class="category">${member.category}</span>
          <span class="level">${getMembershipLevelText(member.membershipLevel)}</span>
        </div>
        <p class="spotlight-address">📍 ${member.address}</p>
        <div class="spotlight-contact">
          <p><strong>📞</strong> ${member.phone || "Not available"}</p>
          <p><strong>📧</strong> ${member.email || "info@queretarochamber.org"}</p>
        </div>
        <a href="${member.website || "#"}" 
            target="_blank" 
            rel="noopener" 
            class="cta-button">
          Visit Website →
        </a>
      </div>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightsContainer.innerHTML = `
      <div class="member-card error-card">
        <p style="color: #e74c3c; margin: 0;">
          💢 Error loading member spotlights: ${error.message}
        </p>
      </div>
    `;
  }
}

// ================================= HELPER FUNCTIONS =================================
function getMembershipLevelText(level) {
  switch (level) {
    case 3:
      return "Gold Member";
    case 2:
      return "Silver Member";
    case 1:
      return "Bronze Member";
    default:
      return "Member";
  }
}

function getMembershipBadge(level) {
  switch (level) {
    case 3:
      return '<span class="gold">🥇 GOLD</span>';
    case 2:
      return '<span class="silver">🥈 SILVER</span>';
    case 1:
      return '<span class="bronze">🥉 BRONZE</span>';
    default:
      return '<span class="member">MEMBER</span>';
  }
}
