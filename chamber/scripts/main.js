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