// Import the getProjectName function from your navigation module
import { getProjectName } from '/scripts/navigation.js';

// Function to populate the page with project data
function populatePage(data) {
  // Set title and description
  document.getElementById('page-title').textContent = data.title;
  document.getElementById('project-title').textContent = data.title;
  document.getElementById('project-description').textContent = data.description;

  // Set hero image
  const heroImg = document.getElementById('hero-image');
  heroImg.src = data.heroImage.src;
  heroImg.alt = data.heroImage.alt;

  // Populate stats
  const statsContainer = document.getElementById('project-stats');
  statsContainer.innerHTML = data.stats.map(stat => `
    <div class="stat-box">
      <h3 class="stat-number">${stat.number}</h3>
      <p class="stat-label">${stat.label}</p>
    </div>
  `).join('');

  // Populate overview
  const overviewContainer = document.getElementById('overview-text');
  overviewContainer.innerHTML = data.overview.map(text => `<p>${text}</p>`).join('');

  // Populate tech stack
  const techStackContainer = document.getElementById('tech-stack');
  techStackContainer.innerHTML = data.techStack.map(tech =>
    `<span class="tech-tag">${tech}</span>`
  ).join('');

  // Populate timeline
  const timelineContainer = document.getElementById('timeline-container');
  if (timelineContainer) {
    if (data.timeline && Array.isArray(data.timeline)) {
        const itemsHTML = data.timeline.map((event, index) => {
        const sideClass = index % 2 === 0 ? 'left' : 'right';
        return `
            <div class="timeline-entry ${sideClass}">
            <div class="timeline-dot"></div>
            <div class="timeline-item">
                <h4>${event.date}</h4>
                <p>${event.description}</p>
            </div>
            </div>
        `;
        }).join('');

        // Wrap in arrows
        timelineContainer.innerHTML = `
        <div class="arrow top"></div>
        ${itemsHTML}
        <div class="arrow bottom"></div>
        `;
    } else {
        timelineContainer.innerHTML = `
        <div class="arrow top"></div>
        <p>No timeline data available.</p>
        <div class="arrow bottom"></div>
        `;
    }
  }

  // Populate gallery
  const galleryContainer = document.getElementById('gallery-grid');
  galleryContainer.innerHTML = data.gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.src}" alt="${item.alt}" />
      <p class="caption">${item.caption}</p>
    </div>
  `).join('');

  // Populate outcomes intro
  const outcomesIntro = document.getElementById('outcomes-intro');
  outcomesIntro.innerHTML = `
    <p>${data.outcomes.intro[0]}</p>
    <div class="outcome-divider"></div>
    <p>${data.outcomes.intro[1]}</p>
  `;

  // Populate outcomes grid
  const outcomesGrid = document.getElementById('outcomes-grid');
  outcomesGrid.innerHTML = data.outcomes.cards.map(card => `
    <div class="outcome-card">
      <div class="outcome-icon">${card.icon}</div>
      <h4>${card.title}</h4>
      <p>${card.description}</p>
    </div>
  `).join('');

  // Ensure content after hero is visible in case it was hidden previously
  const contentAfterHero = document.getElementById('content-after-hero');
  if (contentAfterHero) contentAfterHero.style.display = '';
}

// Function to load project data
async function loadProjectData() {
  const projectName = getProjectName();

  try {
    // Import the project data module
    const { default: projectData } = await import(`./project-data/${projectName}.js`);
    populatePage(projectData);
    } catch (error) {
    console.error(`Error loading project data for ${projectName}:`, error);

    // Hide content
    document.getElementById('hero-section').style.display = 'none';
    document.getElementById('content-after-hero').style.display = 'none';

    // Show error block
    document.getElementById('hero-error').style.display = 'block';

    // Update title
    document.title = 'Project Not Found';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadProjectData);