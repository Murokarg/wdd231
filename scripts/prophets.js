const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    // Store the response from the fetch() method
    const response = await fetch(url);
    // Convert the response into a JSON object
    const data = await response.json();
    // Call the display function and pass the array to it
    displayProphets(data.prophets);
};

// Display function to create cards for each prophet
const displayProphets = (prophets) => {
    // Loop through the prophets array
    prophets.forEach((prophet) => {
        // Create the card container (section tag/element)
        const card = document.createElement('section');

        // Create the h2 element for the name
        const h2 = document.createElement('h2');
        h2.textContent = `${prophet.name} ${prophet.lastname}`; // Uses the data from the JSON object

        // Create the p element for the birthdate
        const birthdate = document.createElement('p');
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

        // Create the p element for the birthplace
        const birthplace = document.createElement('p');
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Create the img element for the portrait
        const image = document.createElement('img');
        image.setAttribute('src', prophet.imageurl);
        image.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        // Append all new elements to the card
        card.appendChild(h2);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(image);
        
        // Put the finished card inside the main #card div
        cards.appendChild(card);
    });
};

getProphetData();

//         // Implementation for displaying prophets
//         forEach(prophet => {
//             // Create elements to add to the document

//         }

//     };