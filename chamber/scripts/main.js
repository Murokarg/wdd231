console.log('Script loaded successfully.');

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



/* 
const membersContainer = document.getElementById('members-container');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const lastModifiedSpan = document.getElementById('lastModified');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const members = await response.json();
    window.membersData = members;
    renderMembers(members, 'grid');
    if (lastModifiedSpan) {
      lastModifiedSpan.textContent = document.lastModified;
    }
  } catch (error) {
    console.error('Error loading members:', error);
    membersContainer.innerHTML = `<p style="color:red;">💢 Error loading directory: ${error.message}</p>`;
  }
}

function renderMembers(members, view = 'grid') {
  if (!members || members.length === 0) {
    membersContainer.innerHTML = '<p>No businesses found.</p>';
    return;
  }

  let html = '';

  members.forEach(member => {
    const email = member.email || 'info@queretarochamber.org';
    const website = member.website || '#';
    const phone = member.phone || 'Not available';

    if (view === 'list') {
      html += `
        <div class="member-card">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder.jpg'; this.alt='Image not available';" />
          <div class="contact">
            <div><strong>${member.name}</strong></div>
            <div>${member.address}</div>
            <div>${phone}</div>
            <div><a href="${website}" target="_blank" rel="noopener">${website.replace(/^https?:\/\//, '')}</a></div>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="member-card">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder.jpg'; this.alt='Image not available';" />
          <h3>${member.name}</h3>
          <div class="contact">
            <p><strong>ADDRESS:</strong> ${member.address}</p>
            <p><strong>PHONE:</strong> ${phone}</p>
            <p><strong>EMAIL:</strong> ${email}</p>
            <p><strong>WEBSITE:</strong> <a href="${website}" target="_blank" rel="noopener">${website.replace(/^https?:\/\//, '')}</a></p>
          </div>
        </div>
      `;
    }
  });

  membersContainer.innerHTML = html;
  membersContainer.className = view === 'grid' ? 'members-grid' : 'members-list';
}

function setupViewToggle() {
  gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    renderMembers(window.membersData, 'grid');
  });

  listViewBtn.addEventListener('click', () => {
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    renderMembers(window.membersData, 'list');
  });
}

function setupMobileMenu() {
  if (!navToggle || !nav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadMembers();
  setupViewToggle();
  setupMobileMenu();
});

// ================================ JOIN PAGE ============================

// Set timestamp on page load
document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('timestamp').value = new Date().toISOString();

      // Form validation enhancement
      const joinForm = document.getElementById('join-form');
      
      joinForm.addEventListener('submit', function(e) {
        // Check if all required fields are filled
        const requiredFields = joinForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
          } else {
            field.style.borderColor = '#ddd';
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          alert('Please fill in all required fields marked with *');
        }
      });
      
      // Add input focus/blur effects
      const inputs = joinForm.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          this.style.borderColor = '#3498db';
        });
        
        input.addEventListener('blur', function() {
          this.style.borderColor = this.value.trim() ? '#27ae60' : '#ddd';
        });
      });
    });

// ================================ THANKYOU PAGE ============================
    document.addEventListener('DOMContentLoaded', function () {
      // Parse query parameters from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Get values from parameters
      const firstName = urlParams.get('firstname') || 'Not provided';
      const lastName = urlParams.get('lastname') || 'Not provided';
      const email = urlParams.get('email') || 'Not provided';
      const phone = urlParams.get('phone') || 'Not provided';
      const businessName = urlParams.get('businessname') || 'Not provided';
      const membership = urlParams.get('membership') || 'Not provided';
      const timestamp = urlParams.get('timestamp') || 'Not provided';

      // Format the timestamp to a more readable format
      let formattedTimestamp = 'Not provided';
      if (timestamp !== 'Not provided') {
        const date = new Date(timestamp);
        formattedTimestamp = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      // Update the DOM with the form data
      document.getElementById('fullName').textContent = `${firstName} ${lastName}`;
      document.getElementById('email').textContent = email;
      document.getElementById('phone').textContent = phone;
      document.getElementById('businessName').textContent = businessName;
      document.getElementById('membership').textContent = getMembershipLevelText(membership);
      document.getElementById('timestamp').textContent = formattedTimestamp;

      // Set the current year and last modified date
      document.getElementById("currentYear").textContent = new Date().getFullYear();
      document.getElementById("lastModified").textContent = document.lastModified;
    });

    // Helper function to convert membership code to readable text
    function getMembershipLevelText(membershipCode) {
      switch (membershipCode) {
        case 'np':
          return 'NP Membership (Non-Profit, No Fee)';
        case 'bronze':
          return 'Bronze Membership';
        case 'silver':
          return 'Silver Membership';
        case 'gold':
          return 'Gold Membership';
        default:
          return 'Not provided';
      }
    }

// ================================  ============================

 */