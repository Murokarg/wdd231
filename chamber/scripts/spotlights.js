export async function getSpotlights () {

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
		if (!response.ok){
			throw new Error("Members data is not available");
		}
	const members = await response.json();
	const filteredMembers = members.filter(member =>
		member.membershipLevel === 3 || 
		member.membershipLevel === 2
	);
	const shuffleFiltered = filteredMembers.sort(() => Math.random() - 0.5);
	const selectedMembers = shuffleFiltered.slice(0, 3);
	let htmlContent = "";
	selectedMembers.forEach(member => {
		htmlContent += `
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
				</div>`
	});
	const spotlightsContainer = document.getElementById("spotlights-grid");
	spotlightsContainer.innerHTML = htmlContent;
	
  } catch (error) {
		const spotlightsContainer = document.getElementById("spotlights-grid");
		spotlightsContainer.innerHTML = "Members data currently unavailable";
  }
}

function getMembershipLevelText(level) {
	switch(level){
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
	switch(level) {
	case 3:
		return '<span class="gold">Gold</span>';
	case 2:
		return '<span class="silver">Silver</span>';
	case 1:
		return '<span class="bronze">Bronze</span>';
	default:
		return '<span class="member">Member</span>';
	}
}

getSpotlights();

}