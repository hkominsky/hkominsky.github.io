// Creates the project page component
class ProjectPageComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <main>
        <div class="project-container">
          <section class="showcase-container">
            <!-- Project Hero (default hidden until data loads) -->
            <div class="project-hero scroll-animate" id="hero-section">
              <div class="project-hero-content">
                <h2 id="project-title"></h2>
                <div class="hero-divider"></div>
                <div class="project-info" id="project-info"></div>
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
              <div class="project-overview-content">
                <div class="project-overview-text" id="overview-text">
                  <!-- Overview text -->
                </div>

                <div class="project-overview-meta">
                  <h4>Tech Stack:</h4>
                  <div class="project-overview-tech-stack" id="tech-stack">
                    <!-- Tech stack -->
                  </div>
                </div>
              </div>
            </section>

            <section class="gallery scroll-animate stagger-children">
              <h2>Gallery</h2>
              <div class="gallery-grid" id="gallery-grid">
                <!-- Gallery items -->
              </div>
            </section>
            
            <section class="project-timeline scroll-animate stagger-children">
              <h2>Timeline</h2>
              <div class="project-overview-timeline" id="timeline-container">
                <!-- Timeline items -->
              </div>
            </section>

          </div>

          <section class="navigation scroll-animate">
            <div class="project-navigation-wrapper">
              <div class="project-navigation project-navigation-last">
                <svg class="project-nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                <h4>Back</h4>
              </div>

              <a href="/" class="project-navigation project-navigation-home" aria-label="Go to home page">
                <svg class="project-nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </a>

              <div class="project-navigation project-navigation-next">
                <h4>Next</h4>
                <svg class="project-nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/>
                </svg>
              </div>
            </div>
          </section>
        </div>
      </main>
    `;
  }
}

customElements.define('project-page', ProjectPageComponent);