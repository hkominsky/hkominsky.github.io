export default {
  title: "Market Brief",
  description:
    "A real-time Q&A platform developed as a capstone project to simulate full-scale production systems.",
  heroImage: {
    src: "/projects/images/code-scout/code-scout.png",
    alt: "Code Scout Dashboard Screenshot"
  },
  stats: [
    { number: "A+", label: "Project Grade" },
    { number: "4", label: "Team Members" }
  ],
  overview: [
    "Code Scout is a Q&A platform inspired by Stack Overflow.",
    "Users can ask questions, post answers, leave comments, vote, "
    + "chat, endorse replies, report inappropriate content, get "
    + "notifications, apply to be a moderator, and handle reports if approved."
  ],
  techStack: [
    "React",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind",
    "MongoDB",
    "WebSockets"
  ],
  timeline: [
    { date: "Sept. 2024", description: "Ideated user stories and planned our MVP scope." },
    { date: "Oct. 2024", description: "Built login and signup pages including roles and access control." },
    { date: "Nov. 2024", description: "Developed question, answer, comment, endorsement, and voting systems." },
    { date: "Nov. 2024", description: "Implemented admin privileges including reporting and applications." },
    { date: "Dec. 2024", description: "Integrated notification system and real-time chat between users." },
    { date: "Dec. 2024", description: "Implemented user profiles with history, stats, and achievement tracking." },
    { date: "Dec. 2024", description: "Final UI/UX overhaul and deployment of the MVP." }
  ],
  gallery: [
    {
      src: "/projects/images/code-scout/login.png",
      alt: "Login Page UI",
      caption: "Login Page"
    },
    {
      src: "/projects/images/code-scout/notifications.png",
      alt: "Live Notifications UI",
      caption: "Live Notification System"
    },
    {
      src: "/projects/images/code-scout/class-diagram.png",
      alt: "Class Diagram Overview",
      caption: "Class Diagram"
    },
    {
      src: "/projects/images/code-scout/messaging.png",
      alt: "Real-time Messaging Feature UI",
      caption: "Live Messaging Feature"
    }
  ],
  outcomes: {
    intro: [
      "This capstone project emphasized production-ready practices and real-time architecture.",
      "In particular:"
    ],
    cards: [
        {
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h10v2H4zm0 5h10v2H4z"/></svg>',
            title: "Extendable Design",
            description:
            "Built with modular React components and clean backend "
            + "routes structured for extendability."
        },
        {
            icon: `
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
            title: "Best Practices",
            description:
            "Implemented secure authentication, input validation, and "
            + "consistent code styling with ESLint and Prettier."
        },
        {
            icon: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                xmlns="http://www.w3.org/2000/svg" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 17.5H3.5M6.5 12H2M9 6.5H4M17 3L10.4036 12.235C10.1116 12.6438 9.96562 12.8481 9.97194 13.0185C9.97744 13.1669 10.0486 13.3051 10.1661 13.3958C10.3011 13.5 10.5522 13.5 11.0546 13.5H16L15 21L21.5964 11.765C21.8884 11.3562 22.0344 11.1519 22.0281 10.9815C22.0226 10.8331 21.9514 10.6949 21.8339 10.6042C21.6989 10.5 21.4478 10.5 20.9454 10.5H16L17 3Z"/>
            </svg>
            `,
            title: "Real-Time Functionality",
            description:
            "Integrated WebSockets for real-time interactivity, "
            + "eliminating inefficient polling and improving responsiveness."
        },
        {
            icon: `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <rect x="3" y="8" width="18" height="12" rx="1" ry="1" fill="none" />
            <path d="M8 20.5h8v2H8z" fill="currentColor" />
            </svg>
            `,
            title: "Frontend & UI Design",
            description:
            "Crafted responsive and accessible UI using Tailwind "
            + " tospeed up development while maintaining clear, consistent styling"
        }
    ]
  }
};