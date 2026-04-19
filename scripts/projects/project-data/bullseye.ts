export default { 
  title: "Bullseye",
  description:
    "A comprehensive market intelligence platform made simple.",
  heroImage: {
    src: "/projects/pages/bullseye/images/bullseye.png",
    alt: "Bullseye Screenshot"
  },
  info: [
    {
      type: "link",
      label: "GitHub",
      url: "https://github.com/hkominsky/bullseye"
    },
  ],
  overview: [
    "Bullseye allows users to track stock tickers and generate on-demand email reports",
    "A FastAPI backend and React frontend provide JWT authentication with OAuth support, dark/light mode, and watchlist management with validated tickers",
    "Reports aggregate company financials, metrics, news, sentiment analysis, and performance charts delivered via SendGrid, with all data persisted in a PostgreSQL database",
    "Full-stack test coverage is provided through Jest and Pytest"
  ],
  techStack: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "SQL",
    "React",
    "TypeScript",
    "HTML",
    "CSS",
  ],
  timeline: [
    { date: "July 2025", description: "Integrated EDGAR, Finnhub, Alpha Vantage, and yFinance APIs" },
    { date: "Aug 2025", description: "Created email templates and connected SendGrid" },
    { date: "Aug 2025", description: "Added financial ratios, metrics, and performance charts" },
    { date: "Aug 2025", description: "Integrated corporate/retail sentiment and sector comparisons" },
    { date: "Sep 2025", description: "Designed PostgreSQL schema for user management and report persistence" },
    { date: "Sep 2025", description: "Built FastAPI backend with JWT and OAuth integration" },
    { date: "Sep 2025", description: "Developed React frontend with watchlist management" },
    { date: "Oct 2025", description: "Added dark/light mode and password reset functionality" },
    { date: "Oct 2025", description: "Completed testing and deployed platform" }
  ],
  gallery: [
    {
      src: "/projects/pages/bullseye/images/login.png",
      alt: "Login Page Screenshot",
      caption: "Login Page"
    },
    {
      src: "/projects/pages/bullseye/images/dashboard.png",
      alt: "Dashboard Screenshot",
      caption: "Dashboard"
    },
    {
      src: "/projects/pages/bullseye/images/database.png",
      alt: "Database Screenshot",
      caption: "PostgreSQL Database"
    },
    {
      src: "/projects/pages/bullseye/images/email.png",
      alt: "Email Screenshot",
      caption: "Sample Email"
    }
  ]
};