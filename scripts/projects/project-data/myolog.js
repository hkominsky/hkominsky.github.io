export default {
  title: "Myolog",
  description:
    "A Python application that automates workout data collection, processing, and visualization to deliver actionable fitness insights.",
  heroImage: {
    src: "/projects/pages/myolog/images/myolog.png",
    alt: "MyoLog Dashboard Screenshot"
  },
  info: [
    {
      type: "link",
      label: "Live Site",
      url: "https://www.myolog.fit"
    },
    {
      type: "link",
      label: "Demo",
      url: "https://youtu.be/YfkxJAHMxl8?si=ULGkTm5Ee3WTUvpP"
    }
  ],
  overview: [
    "MyoLog is a full-stack data visualization platform that automatically scrapes workout logs from Hevy using Selenium",
    "Users can explore their progress across muscles, exercises, and sessions through responsive filtering and aggregation across multiple pages, with all data stored in a SQLite database",
    "Flask routes are designed modularly for maintainability, and the UI is mobile-friendly with accessible components across devices"
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
    { date: "June 2025", description: "Built automated web scraping pipeline for workout data" },
    { date: "July 2025", description: "Developed data cleaning and transformation pipelines" },
    { date: "July 2025", description: "Implemented overview dashboard and core Flask endpoints" },
    { date: "July 2025", description: "Built muscle-specific analytics and visualizations" },
    { date: "July 2025", description: "Developed exercise-level breakdown pages with interactive filtering" },
    { date: "July 2025", description: "Added responsive styling for mobile viewing" },
    { date: "Aug 2025", description: "Created a SQLite database to store scraped data" },
    { date: "Aug 2025", description: "Conducted UI/UX overhaul, optimized Flask routes, and deployed final build" },
    { date: "Sept 2025", description: "Converted database to PostgreSQL and hosted on Supabase" },
    { date: "Sept 2025", description: "Implemented GitHub Actions to automate scraping and hosted front end on Render" }
  ],
  gallery: [
    {
      src: "/projects/pages/myolog/images/export.png",
      alt: "Automated Scraping Screenshot",
      caption: "Automated Scraping"
    },
    {
      src: "/projects/pages/myolog/images/overview.png",
      alt: "Overview Page Screenshot",
      caption: "Overview Page"
    },
    {
      src: "/projects/pages/myolog/images/muscles.png",
      alt: "Muscle Page Screenshot",
      caption: "Muscles Page"
    },
    {
      src: "/projects/pages/myolog/images/exercises.png",
      alt: "Exercise Page Screenshot",
      caption: "Exercises Page"
    }
  ]
};