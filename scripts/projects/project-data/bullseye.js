export default { 
  title: "Bullseye",
  description:
    "A comprehensive market intelligence platform made simple.",
  heroImage: {
    src: "/projects/images/bullseye/bullseye.png",
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
    "Bullseye allows users to track stock tickers and generate on-demand email reports.",
    "A FastAPI backend and React frontend provide JWT authentication, dark/light mode support, and watchlist and reserve list management with validated tickers.",
    "Reports aggregate company financials, metrics, news, sentiment analysis, and performance charts sent through SendGrid.",
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
    { date: "July 2025", description: "Integrated EDGAR, Finnhub, Alpha Vantage, and yFinance APIs." },
    { date: "Aug 2025", description: "Created email templates and connected SendGrid." },
    { date: "Aug 2025", description: "Added financial ratios, metrics, and performance charts." },
    { date: "Aug 2025", description: "Integrated corporate/retail sentiment and sector comparisons." },
    { date: "Sep 2025", description: "Designed PostgreSQL schema for user management and report persistence." },
    { date: "Sep 2025", description: "Built FastAPI backend with JWT and OAuth integration." },
    { date: "Sep 2025", description: "Developed React frontend with watchlist management." },
    { date: "Oct 2025", description: "Added dark/light mode and password reset functionality." },
    { date: "Oct 2025", description: "Completed testing and deployed platform." }
  ],
  gallery: [
    {
      src: "/projects/images/bullseye/login.png",
      alt: "Login Page Screenshot",
      caption: "Login Page"
    },
    {
      src: "/projects/images/bullseye/dashboard.png",
      alt: "Dashboard Screenshot",
      caption: "Dashboard"
    },
    {
      src: "/projects/images/bullseye/database.png",
      alt: "Database Screenshot",
      caption: "PostgreSQL Database"
    },
    {
      src: "/projects/images/bullseye/email.png",
      alt: "Email Screenshot",
      caption: "Sample Email"
    }
  ],
  outcomes: {
    intro: [
      "Bullseye streamlined financial tracking into a comprehensive full-stack solution.",
      "Key outcomes include:"
    ],
    cards: [
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        `,
        title: "External Tools",
        description:
          "Integrated SendGrid, Twitter Developer, Finnhub, Alpha Vantage, and yFinance for data retrieval and email delivery."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
        `,
        title: "Data Persistence",
        description:
          "Designed PostgreSQL database to persist user accounts, watchlists, and complete email report data."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        `,
        title: "Full-Stack Testing",
        description:
          "Implemented comprehensive test coverage using Jest for React components and Pytest for FastAPI backend endpoints."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
        <circle cx="12" cy="16" r="1"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
        </svg>
        `,
        title: "Auth Management",
        description:
          "Implemented JWT authentication with OAuth support for GitHub and Google, plus password reset functionality."
      }
    ]
  }
};