import { getProjectName } from '../navigation/navigation.ts';

/**
 * Hero image data structure
 */
interface HeroImage {
  src: string;
  alt: string;
}

/**
 * Info item for metric display
 */
interface MetricInfo {
  type: 'metric';
  value: string;
  label: string;
}

/**
 * Info item for link display
 */
interface LinkInfo {
  type: 'link';
  url: string;
  label: string;
}

/**
 * Union type for all info items
 */
type InfoItem = MetricInfo | LinkInfo;

/**
 * Gallery item structure
 */
interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Timeline event structure
 */
interface TimelineEvent {
  date: string;
  description: string;
}

/**
 * Complete project data structure
 */
interface ProjectData {
  title: string;
  description: string;
  heroImage: HeroImage;
  info: InfoItem[];
  overview: string[];
  techStack: string[];
  gallery: GalleryItem[];
  timeline?: TimelineEvent[];
}

/**
 * Populates title and description sections of the project page.
 * @param data - The project data object
 */
function populateTitleAndDescription(data: ProjectData): void {
  const pageTitle = document.getElementById('page-title');
  const projectTitle = document.getElementById('project-title');
  
  if (pageTitle) pageTitle.textContent = data.title;
  if (projectTitle) projectTitle.textContent = data.title;
}

/**
 * Populates the hero image section.
 * @param heroImage - The hero image object
 */
function populateHeroImage(heroImage: HeroImage): void {
  const heroImg = document.getElementById('hero-image') as HTMLImageElement;
  if (heroImg) {
    heroImg.src = heroImage.src;
    heroImg.alt = heroImage.alt;
  }
}

/**
 * Creates HTML for a metric-style info box.
 * @param item - Info item object
 */
function createMetricInfo(item: MetricInfo): string {
  return `
    <div class="info-box">
      <h3 class="info-number">${item.value}</h3>
      <p class="info-label">${item.label}</p>
    </div>
  `;
}

/**
 * Creates HTML for a link-style info box.
 * @param item - Info item object
 */
function createLinkInfo(item: LinkInfo): string {
  return `
    <div class="info-box">
      <a
        class="project-card-cta"
        href="${item.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${item.label}
        <img src="/global/images/icons/navigate.svg" alt="" class="cta-icon">
      </a>
    </div>
  `;
}

/**
 * Populates the project info section with metrics or links.
 *
 * Supported types:
 * - "metric": displays a numeric/statistic highlight
 * - "link": displays an external link
 *
 * @param info - Array of info objects
 */
function populateInfo(info: InfoItem[]): void {
  const container = document.getElementById("project-info");
  if (!container) return;

  container.innerHTML = info
    .map((item: InfoItem): string =>
      item.type === "metric"
        ? createMetricInfo(item)
        : createLinkInfo(item)
    )
    .join("");
}

/**
 * Populates the overview text section.
 * @param overview - Array of paragraph text strings
 */
function populateOverview(overview: string[]): void {
  const overviewContainer = document.getElementById('overview-text');
  if (!overviewContainer) return;
  
  overviewContainer.innerHTML = overview.map((text: string): string => `<p>${text}</p>`).join('');
}

/**
 * Populates the technology stack section.
 * @param techStack - Array of technology names
 */
function populateTechStack(techStack: string[]): void {
  const techStackContainer = document.getElementById('tech-stack');
  if (!techStackContainer) return;
  
  techStackContainer.innerHTML = techStack.map((tech: string): string =>
    `<span class="tech-tag">${tech}</span>`
  ).join('');
}

/**
 * Populates the gallery section.
 * @param gallery - Array of gallery image objects
 */
function populateGallery(gallery: GalleryItem[]): void {
  const galleryContainer = document.getElementById('gallery-grid');
  if (!galleryContainer) return;
  
  galleryContainer.innerHTML = gallery.map((item: GalleryItem): string => `
    <div class="gallery-item">
      <img src="${item.src}" alt="${item.alt}" />
      <p class="caption">${item.caption}</p>
    </div>
  `).join('');
}

/**
 * Populates the timeline section, or shows a fallback message.
 * @param timeline - Array of timeline event objects
 */
function populateTimeline(timeline?: TimelineEvent[]): void {
  const timelineContainer = document.getElementById('timeline-container');
  if (!timelineContainer) return;

  if (timeline && Array.isArray(timeline)) {
    const itemsHTML: string = timeline.map((event: TimelineEvent, index: number): string => {
      const sideClass: string = index % 2 === 0 ? 'left' : 'right';
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
function showContentAfterHero(): void {
  const contentAfterHero = document.getElementById('content-after-hero') as HTMLElement;
  if (contentAfterHero) contentAfterHero.style.display = '';
}

/**
 * Main function to populate all page sections.
 * @param data - The project data object containing all section data
 */
function populatePage(data: ProjectData): void {
  populateTitleAndDescription(data);
  populateHeroImage(data.heroImage);
  populateInfo(data.info);
  populateOverview(data.overview);
  populateTechStack(data.techStack);
  populateGallery(data.gallery);
  populateTimeline(data.timeline);
  showContentAfterHero();
}

/**
 * Loads project data dynamically based on current URL and populates the page.
 */
export async function loadProjectData(): Promise<void> {
  const projectName: string = getProjectName();

  try {
    const module = await import(`./project-data/${projectName}.ts`) as { default: ProjectData };
    const projectData: ProjectData = module.default;
    populatePage(projectData);
  } catch (error) {
    console.error(`Error loading project data for ${projectName}:`, error);

    const heroSection = document.getElementById('hero-section') as HTMLElement;
    const contentAfterHero = document.getElementById('content-after-hero') as HTMLElement;
    const heroError = document.getElementById('hero-error') as HTMLElement;

    if (heroSection) heroSection.style.display = 'none';
    if (contentAfterHero) contentAfterHero.style.display = 'none';
    if (heroError) heroError.style.display = 'block';

    document.title = 'Project Not Found';
  }
}