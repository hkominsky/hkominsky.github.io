import { getProjectName } from '/scripts/navigation/navigation.js';

/**
 * Populates title and description sections of the project page.
 * @param {Object} data - The project data object
 * @param {string} data.title - The project title to display
 * @param {string} data.description - The project description text
 */
function populateTitleAndDescription(data) {
  document.getElementById('page-title').textContent = data.title;
  document.getElementById('project-title').textContent = data.title;
  document.getElementById('project-description').textContent = data.description;
}

/**
 * Populates the hero image section.
 * @param {Object} heroImage - The hero image object
 * @param {string} heroImage.src - The image source URL
 * @param {string} heroImage.alt - The image alt text for accessibility
 */
function populateHeroImage(heroImage) {
  const heroImg = document.getElementById('hero-image');
  heroImg.src = heroImage.src;
  heroImg.alt = heroImage.alt;
}

/**
 * Populates the project stats section.
 * @param {Array<{number: string|number, label: string}>} stats - Array of stat objects
 */
function populateStats(stats) {
  const statsContainer = document.getElementById('project-stats');
  statsContainer.innerHTML = stats.map(stat => `
    <div class="stat-box">
      <h3 class="stat-number">${stat.number}</h3>
      <p class="stat-label">${stat.label}</p>
    </div>
  `).join('');
}

/**
 * Populates the overview text section.
 * @param {string[]} overview - Array of paragraph text strings
 */
function populateOverview(overview) {
  const overviewContainer = document.getElementById('overview-text');
  overviewContainer.innerHTML = overview.map(text => `<p>${text}</p>`).join('');
}

/**
 * Populates the technology stack section.
 * @param {string[]} techStack - Array of technology names
 */
function populateTechStack(techStack) {
  const techStackContainer = document.getElementById('tech-stack');
  techStackContainer.innerHTML = techStack.map(tech =>
    `<span class="tech-tag">${tech}</span>`
  ).join('');
}

/**
 * Populates the gallery section.
 * @param {Array<{src: string, alt: string, caption: string}>} gallery - Array of gallery image objects
 */
function populateGallery(gallery) {
  const galleryContainer = document.getElementById('gallery-grid');
  galleryContainer.innerHTML = gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.src}" alt="${item.alt}" />
      <p class="caption">${item.caption}</p>
    </div>
  `).join('');
}


/**
 * Populates the timeline section, or shows a fallback message.
 * @param {Array<{date: string, description: string}>} timeline - Array of timeline event objects
 */
function populateTimeline(timeline) {
  const timelineContainer = document.getElementById('timeline-container');
  if (!timelineContainer) return;

  if (timeline && Array.isArray(timeline)) {
    const itemsHTML = timeline.map((event, index) => {
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

/**
 * Shows the main content sections after the hero.
 */
function showContentAfterHero() {
  const contentAfterHero = document.getElementById('content-after-hero');
  if (contentAfterHero) contentAfterHero.style.display = '';
}

/**
 * Main function to populate all page sections.
 * @param {Object} data - The project data object containing all section data
 */
function populatePage(data) {
  populateTitleAndDescription(data);
  populateHeroImage(data.heroImage);
  populateStats(data.stats);
  populateOverview(data.overview);
  populateTechStack(data.techStack);
  populateGallery(data.gallery);
  populateTimeline(data.timeline);
  showContentAfterHero();
}

/**
 * Loads project data dynamically based on current URL and populates the page.
 */
export async function loadProjectData() {
  const projectName = getProjectName();

  try {
    const { default: projectData } = await import(`./project-data/${projectName}.js`);
    populatePage(projectData);
  } catch (error) {
    console.error(`Error loading project data for ${projectName}:`, error);

    document.getElementById('hero-section').style.display = 'none';
    document.getElementById('content-after-hero').style.display = 'none';
    document.getElementById('hero-error').style.display = 'block';

    document.title = 'Project Not Found';
  }
}