// store and select elements that we are going to use.
const navbutton = document.querySelector('#ham-btn');

// add event listener to the button (navbutton) to listen for 'click' events
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
});