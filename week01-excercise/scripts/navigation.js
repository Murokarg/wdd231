// store and select elements that we are going to use.
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

// add the year and the last modified date
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

// add event listener to the button (navbutton) to listen for 'click' events
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');

});

// functions to add the year and the last modified date
document.getElementById("currentYear").textContent = currentYear;
document.getElementById("lastModified").textContent = document.lastModified;