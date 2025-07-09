// Creates the project page component
class ProjectPageComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <main>
        <div class="project-container">
          <section class="showcase-container">
            <!-- Project Hero Section (default hidden until data loads) -->
            <div class="project-hero scroll-animate" id="hero-section">
              <div class="project-hero-content">
                <h1 id="project-title"></h1>
                <p id="project-description"></p>
                <div class="hero-divider"></div>
                <div class="project-stats" id="project-stats"></div>
              </div>
              <div class="project-hero-image">
                <img id="hero-image" src="" alt="" />
              </div>
            </div>

            <!-- Error Section (hidden by default) -->
            <div class="project-error" id="hero-error" style="display: none;">
              <h1>Project Not Found</h1>
              <p>Sorry, the project data could not be loaded.</p>
            </div>
          </section>

          <div id="content-after-hero">
            <section class="project-overview scroll-animate stagger-children">
              <h2>Project Overview</h2>
              <div class="project-overview__content">
                <div class="project-overview__text" id="overview-text">
                  <!-- Overview text will be populated here -->
                </div>

                <div class="project-overview__meta">
                  <h4>Tech Stack:</h4>
                  <div class="project-overview__tech-stack" id="tech-stack">
                    <!-- Tech stack will be populated here -->
                  </div>
                </div>
              </div>
            </section>
            
            <section class="project-timeline scroll-animate stagger-children">
              <h2>Timeline</h2>
              <div class="project-overview__timeline" id="timeline-container">
                <!-- Timeline items will be populated here -->
              </div>
            </section>

            <section class="gallery scroll-animate stagger-children">
              <h2>Gallery</h2>
              <div class="gallery-grid" id="gallery-grid">
                <!-- Gallery items will be populated here -->
              </div>
            </section>

            <section class="project-outcomes scroll-animate stagger-children">
              <h2>Outcomes</h2>
              <div class="outcomes-content">
                <div class="outcomes-intro" id="outcomes-intro">
                  <!-- Outcomes intro will be populated here -->
                </div>

                <div class="outcomes-grid" id="outcomes-grid">
                  <!-- Outcome cards will be populated here -->
                </div>
              </div>
            </section>
          </div>

          <section class="navigation scroll-animate">
            <div id="projectNavigation"></div>  
          </section>
        </div>
      </main>
    `;
  }
}

customElements.define('project-page', ProjectPageComponent);