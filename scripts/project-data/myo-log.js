export default {
  title: "MyoLog",
  description:
    "A Python application that automates workout data collection, processing, and visualization to deliver actionable fitness insights.",
  heroImage: {
    src: "/projects/images/myolog/dashboard.png",
    alt: "MyoLog Dashboard"
  },
  stats: [
    { number: "12+", label: "Interactive Visualizations" },
    { number: "18+", label: "Flask Endpoints" }
  ],
  overview: [
    "MyoLog is a full-stack data visualization platform that automatically scrapes workout logs from Hevy. "
    + "The data is cleaned, transformed, and surfaced through dynamic, interactive dashboards. "
    + "Users can explore their progress across muscles, exercises, and sessions, with responsive "
    + "filtering and aggregation across multiple pages."
  ],
  techStack: [
    "Python",
    "Selenium",
    "Flask",
    "Pandas",
    "JavaScript",
    "HTML",
    "CSS"
  ],
  timeline: [
    { date: "June 2025", description: "Defined user stories and scoped the MVP." },
    { date: "June 2025", description: "Built automated web scraping pipeline for workout data." },
    { date: "July 2025", description: "Developed data cleaning and transformation pipelines with Pandas." },
    { date: "July 2025", description: "Implemented overview dashboard and core Flask endpoints." },
    { date: "July 2025", description: "Built muscle-specific analytics and visualizations." },
    { date: "July 2025", description: "Developed exercise-level breakdown pages with interactive filtering." },
    { date: "July 2025", description: "Added client-side filtering and responsive styling for mobile." },
    { date: "Aug 2025", description: "Conducted UI/UX overhaul, optimized Flask routes, and deployed final build." }
  ],
  gallery: [
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
    },
    {
      src: "/projects/images/myolog/scraping.png",
      alt: "Data Pipeline",
      caption: "Automated Scraping & Processing"
    }
  ],
  outcomes: {
    intro: [
      "MyoLog emphasized building production-ready data workflows and intuitive data exploration tools.",
      "Key outcomes include:"
    ],
    cards: [
      {
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h10v2H4zm0 5h10v2H4z"/></svg>',
        title: "Scalable Data Pipeline",
        description:
          "Engineered automated scraping and ETL pipelines that reliably collect, clean, and store workout data for analysis."
      },
      {
        icon: `
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
        title: "Clean API Architecture",
        description:
          "Designed modular Flask routes and structured data models for maintainability, testing, and future extensions."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 17.5H3.5M6.5 12H2M9 6.5H4M17 3L10.4036 12.235C10.1116 12.6438 9.96562 12.8481 9.97194 13.0185C9.97744 13.1669 10.0486 13.3051 10.1661 13.3958C10.3011 13.5 10.5522 13.5 11.0546 13.5H16L15 21L21.5964 11.765C21.8884 11.3562 22.0344 11.1519 22.0281 10.9815C22.0226 10.8331 21.9514 10.6949 21.8339 10.6042C21.6989 10.5 21.4478 10.5 20.9454 10.5H16L17 3Z"/>
        </svg>
        `,
        title: "Interactive Dashboards",
        description:
          "Built responsive, data-driven pages with interactive filtering, aggregation, and visualization for intuitive insights."
      },
      {
        icon: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <rect x="3" y="8" width="18" height="12" rx="1" ry="1" fill="none" />
        <path d="M8 20.5h8v2H8z" fill="currentColor" />
        </svg>
        `, 
        title: "UI/UX Design",
        description:
          "Implemented a clean, mobile-friendly UI with accessible components to ensure usability across devices."
      }
    ]
  }
};
