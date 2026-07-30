import { temples } from "../data/temples.js";
// console.log(temples);


import { url } from "../data/temples.js";
// console.log(url);

const showHere = document.querySelector("#showHere");
const myDialog = document.querySelector("#mydialog");

const myTitle = document.querySelector("#mydialog h2");
const myClose = document.querySelector("#mydialog button");

const myInfo = document.querySelector("#mydialog p");

// Closes the modal
myClose.addEventListener("click", () => myDialog.close());

// loop through the array of Json Items
function displayItems (data) {
    console.log(data)
    data.forEach(element => {
        console.log(element)
        const photo = document.createElement('img');
        photo.src = `${url}${element.path}`
        photo.alt = element.name
        // Add an eventListener to each division on the page.
    photo.addEventListener("click", () => showStuff(element));
        // Append each photo 
        showHere.appendChild(photo)
    });
}

displayItems(temples);

// Populate the dialog with information when image is clicked
function showStuff(element) {
    myTitle.innerHTML = element.name
    myInfo.innerHTML = `Dedicated ${element.dedicated} by ${element.person} as temple number ${element.number}`
    myDialog.showModal()

}

