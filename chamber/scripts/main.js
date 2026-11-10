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

const membersData = 'data/members.json';
const membersContainer = document.getElementById('members-container');
console.log('Container found:', membersContainer);

// Select the toggle buttons
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

// Add click event for Grid View
gridViewBtn.addEventListener('click', () => {
  membersContainer.classList.remove('members-list');
  membersContainer.classList.add('members-grid');

  // Update button states
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
});

// Add click event for List View
  listViewBtn.addEventListener('click', () => {
    membersContainer.classList.remove('members-grid');
    membersContainer.classList.add('members-list');

    // Update button states
    gridViewBtn.classList.remove('active');
    listViewBtn.classList.add('active');
  });

// Fetch and display members data
async function getMembersData() {
  const response = await fetch(membersData);
  const data = await response.json();
  console.table(data);
  displayMembers(data);
}

// Function to display members in the container
const displayMembers = (members) => {
  members.forEach((member) => {
    // Create the card container (section with a class of "member-card")
    const card = document.createElement('section');
    card.classList.add('member-card');

    // Create and append the image element
    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = member.name;
    img.loading = 'lazy';

    // Create an h2 element for the heading and set its text content to the member's name
    const heading = document.createElement('h2');
    heading.textContent = member.name; // Set the text content to the member's name

    // Create and append the category
    const category = document.createElement('p');
    category.textContent = member.category;

    // Create and append the address
    const address = document.createElement('p');
    address.textContent = member.address;
    
    // Create and append the phone number
    const phone = document.createElement('p');
    phone.textContent = member.phone;

    // Create and append the email
    const email = document.createElement('a');
    email.href = `mailto:${member.email}`;
    email.textContent = member.email;

    // Create and append the website
    const website = document.createElement('a');
    website.href = member.website;
    website.textContent = 'Visit Website';
    website.target = '_blank';


    // Append all elements to the members container
    card.appendChild(img);
    card.appendChild(heading);
    card.appendChild(category);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(email);
    card.appendChild(website);

    // Append the card to the members container
    membersContainer.appendChild(card);
  });
};

getMembersData();