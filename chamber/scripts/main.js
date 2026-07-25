// add the year and the last modified date
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

// functions to add the year and the last modified date
document.getElementById("currentYear").textContent = currentYear;
document.getElementById("lastModified").textContent = document.lastModified;


// Hamburger menu toggle
function setupHamburger() {
	const navToggleBtn = document.querySelector(".nav-toggle");
	const navMenu = document.querySelector("nav");
	
	navToggleBtn.addEventListener('click', () => {
		navMenu.classList.toggle('active');
	});
}

setupHamburger();

