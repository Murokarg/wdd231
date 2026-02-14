// scripts/discover.js
import { places } from "../data/places.mjs";

// DOM Elements
const cardsGrid = document.querySelector(".cards-grid");
const visitMessageEl = document.querySelector(".visit-message");

// 1. Render Visit Message using localStorage
function showVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor(
      (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24),
    );
    if (days < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now.toString());
  visitMessageEl.textContent = message;
}

// 2. Check if device supports hover (avoid hover effects on mobile)
function isHoverSupported() {
  return window.matchMedia("(hover: hover)").matches;
}

// 3. Create a single card element
function createCard(place, index) {
  const card = document.createElement("article");
  card.className = "card";
  // Use grid-area based on id (1-8) for template-areas layout
  card.style.gridArea = `card${place.id}`;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = `images/${place.image}`;
  img.alt = place.title;
  img.width = 300;
  img.height = 200;
  img.loading = "lazy"; 

  // Add hover effect only if supported
  if (isHoverSupported()) {
    img.classList.add("hover-effect");
  }

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = place.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.textContent = "learn more";
  button.setAttribute("aria-label", `Learn more about ${place.title}`);

  card.appendChild(figure);
  card.appendChild(address);
  card.appendChild(description);
  card.appendChild(button);

  return card;
}

// 4. Render all cards
function renderCards() {
  cardsGrid.innerHTML = ""; // Clear container
  places.forEach((place, index) => {
    const card = createCard(place, index);
    cardsGrid.appendChild(card);
  });
}

// 5. Initialize
document.addEventListener("DOMContentLoaded", () => {
  showVisitMessage();
  renderCards();
});
