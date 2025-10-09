export default {
  title: "MyoLog",
  description:
    "A Python application that automates workout data collection, processing, and visualization to deliver actionable fitness insights.",
  heroImage: {
    src: "/projects/images/myolog/myolog.png",
    alt: "MyoLog Dashboard Screenshot"
  },
  stats: [
    { number: "12", label: "Interactive Visualizations" },
    { number: "18", label: "Flask Endpoints" }
  ],
  overview: [
    "MyoLog is a full-stack data visualization platform that automatically scrapes workout logs from Hevy. ",
    "Users can explore their progress across muscles, exercises, and sessions, with responsive filtering and aggregation across multiple pages."
  ],
  techStack: [
    "Python",
    "Selenium",
    "Flask",
    "SQLite",
    "CSS",
    "JavaScript",
    "HTML",
  ],
  timeline: [
    { date: "June 2025", description: "Built automated web scraping pipeline for workout data." },
    { date: "July 2025", description: "Developed data cleaning and transformation pipelines." },
    { date: "July 2025", description: "Implemented overview dashboard and core Flask endpoints." },
    { date: "July 2025", description: "Built muscle-specific analytics and visualizations." },
    { date: "July 2025", description: "Developed exercise-level breakdown pages with interactive filtering." },
    { date: "July 2025", description: "Added responsive styling for mobile viewing." },
    { date: "Aug 2025", description: "Created a SQLite database to store scraped data." },
    { date: "Aug 2025", description: "Conducted UI/UX overhaul, optimized Flask routes, and deployed final build." },
  ],
  gallery: [
    {
      src: "/projects/images/myolog/export.png",
      alt: "Data Pipeline",
      caption: "Automated Scraping"
    },
    {
      src: "/projects/images/myolog/overview.png",
      alt: "Overview Dashboard",
      caption: "Overview Page"
    },
    {
      src: "/projects/images/myolog/muscles.png",
      alt: "Muscle Analytics",
      caption: "Muscles Page"
    },
    {
      src: "/projects/images/myolog/exercises.png",
      alt: "Exercise Analytics",
      caption: "Exercises Page"
    }
  ],
  outcomes: {
  intro: [
    "I developed MyoLog to optimize my training routine with data-driven metrics and intuitive exploration tools.",
    "Key outcomes include:"
  ],
    cards: [
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        `,
        title: "Clean Data Pipeline",
        description:
          "Engineered automated scraping and ETL pipelines that collect, clean, and store workout data for analysis and review."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        `,
        title: "Scalable API Architecture",
        description:
          "Designed modular Flask routes for maintainability, extendability, and testing."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
        </svg>
        `,
        title: "Interactive Dashboards",
        description:
          "Built responsive, pages with interactive filtering, aggregation, and visualization."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        `, 
        title: "UI/UX Design",
        description:
          "Implemented a clean, mobile-friendly UI with accessible components to ensure usability across devices."
      }
    ]
  }
};