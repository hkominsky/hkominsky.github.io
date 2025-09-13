export default { 
  title: "Market Brief",
  description:
    "An automated market intelligence platform that delivers real-time financial briefings via email, integrating data from multiple APIs with a full Python-to-React pipeline.",
  heroImage: {
    src: "/projects/images/market-brief/dashboard.png",
    alt: "Market Brief Dashboard Screenshot"
  },
  stats: [
    { number: "9", label: "Database Tables" },
    { number: "4", label: "External APIs Integrated" }
  ],
  overview: [
    "Market Brief is an automated reporting system that runs on webhooks triggered by SEC quarterly filings for specified stock tickers.",
    "Once triggered, the system aggregates company financials, calculated metrics, recent news stories, corporate and retail sentiment, sector analysis, and annual stock performance charts.",
    "Each report is formatted and sent as an automated email using SendGrid, with all underlying data stored in a PostgreSQL database across nine structured tables.",
    "A FastAPI backend and React frontend provide user authentication, mailing list management, and customizable webhook subscriptions."
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
    "SendGrid",
    "EDGAR API",
    "Finnhub API",
    "Alpha Vantage API",
    "yFinance"
  ],
  timeline: [
    { date: "July 2025", description: "Set up webhook system to trigger automated emails when quarterly filings were made for tracked tickers." },
    { date: "Aug 2025", description: "Integrated EDGAR, Finnhub, Alpha Vantage, and yFinance APIs to pull company financials, metrics, and market data." },
    { date: "Aug 2025", description: "Created email templates and connected SendGrid for automated delivery of reports." },
    { date: "Aug. 2025", description: "Added calculated financial ratios and performance metrics to the email pipeline." },
    { date: "Aug. 2025", description: "Integrated corporate and retail sentiment analysis, sector comparisons, and yearly stock chart visualizations." },
    { date: "Aug. 2025", description: "Finalized full automated email composition with all content sections populated." },
    { date: "Sep. 2025", description: "Designed PostgreSQL schema with 9 dedicated tables to store financials, metrics, sentiment, sector data, and news." },
    { date: "Sep. 2025", description: "Implemented data persistence so each generated email was logged and retrievable from the database." },
    { date: "Sep. 2025", description: "Developed FastAPI backend for authentication, user signup/login, and ticker webhook management." },
    { date: "Sep. 2025", description: "Built React frontend to allow users to register, subscribe/unsubscribe, and configure tickers for email alerts." },
    { date: "Oct. 2025", description: "Completed testing, polished UI/UX, and deployed Market Brief as a fully automated platform." }
  ],
  gallery: [
    {
      src: "/projects/images/market-brief/email.png",
      alt: "Automated Email Screenshot",
      caption: "Sample Market Brief Email"
    },
    {
      src: "/projects/images/market-brief/db.png",
      alt: "Database Schema",
      caption: "PostgreSQL Database with 9 Tables"
    },
    {
      src: "/projects/images/market-brief/frontend.png",
      alt: "Frontend Interface",
      caption: "React Frontend for Ticker & User Management"
    },
    {
      src: "/projects/images/market-brief/pipeline.png",
      alt: "Data Pipeline Diagram",
      caption: "Webhook-Driven Python Pipeline"
    }
  ],
  outcomes: {
    intro: [
      "Market Brief emphasized production-ready automation, API integration, and full-stack engineering practices.",
      "Key outcomes include:"
    ],
    cards: [
        {
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h10v2H4zm0 5h10v2H4z"/></svg>',
            title: "Automated Pipeline",
            description:
              "Designed webhook-triggered pipelines in Python to fetch, clean, and aggregate financial, market, and sentiment data from multiple APIs."
        },
        {
            icon: `
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
            title: "Data Persistence",
            description:
              "Structured PostgreSQL database with 9 relational tables to persist each email section for auditability and scalability."
        },
        {
            icon: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                xmlns="http://www.w3.org/2000/svg" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 17.5H3.5M6.5 12H2M9 6.5H4M17 3L10.4036 12.235C10.1116 12.6438 9.96562 12.8481 9.97194 13.0185C9.97744 13.1669 10.0486 13.3051 10.1661 13.3958C10.3011 13.5 10.5522 13.5 11.0546 13.5H16L15 21L21.5964 11.765C21.8884 11.3562 22.0344 11.1519 22.0281 10.9815C22.0226 10.8331 21.9514 10.6949 21.8339 10.6042C21.6989 10.5 21.4478 10.5 20.9454 10.5H16L17 3Z"/>
            </svg>
            `,
            title: "Automated Email Delivery",
            description:
              "Integrated SendGrid to send production-ready reports, ensuring timely delivery of financial insights without manual intervention."
        },
        {
            icon: `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <rect x="3" y="8" width="18" height="12" rx="1" ry="1" fill="none" />
            <path d="M8 20.5h8v2H8z" fill="currentColor" />
            </svg>
            `,
            title: "Full-Stack Experience",
            description:
              "Developed FastAPI backend for authentication and webhook management, and React frontend for user signup, login, and ticker customization."
        }
    ]
  }
};
