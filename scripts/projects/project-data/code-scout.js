export default {
  title: "Code Scout",
  description:
    "A real-time Q&A platform developed as a capstone project to simulate full-scale production systems.",
  heroImage: {
    src: "/projects/images/code-scout/code-scout.png",
    alt: "Code Scout Dashboard Screenshot"
  },
  info: [
    {
      type: "link",
      label: "GitHub",
      url: "https://github.com/neu-cs4530/fall24-project-fall24-team-project-group-108"
    },
  ],
  overview: [
    "Code Scout is a Q&A platform inspired by Stack Overflow, built as a capstone project to simulate full-scale production systems",
    "Users can ask questions, post answers, leave comments, vote, chat, endorse replies, report content, and apply for moderation roles",
    "The platform uses WebSockets for real-time interactivity and follows best practices including secure authentication, input validation, and consistent code styling with ESLint and Prettier"
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
    { date: "Sept. 2024", description: "Ideated user stories and planned our MVP scope" },
    { date: "Oct. 2024", description: "Built login and signup pages including roles and access control" },
    { date: "Nov. 2024", description: "Developed question, answer, comment, endorsement, and voting systems" },
    { date: "Nov. 2024", description: "Implemented admin privileges including reporting and applications" },
    { date: "Dec. 2024", description: "Integrated notification system and real-time chat between users" },
    { date: "Dec. 2024", description: "Implemented user profiles with history, stats, and achievement tracking" },
    { date: "Dec. 2024", description: "Final UI/UX overhaul and deployment of the MVP" }
  ],
  gallery: [
    {
      src: "/projects/images/code-scout/login.png",
      alt: "Login Page Screenshot",
      caption: "Login"
    },
    {
      src: "/projects/images/code-scout/notifications.png",
      alt: "Notifications Screenshot",
      caption: "Notifications"
    },
    {
      src: "/projects/images/code-scout/class-diagram.png",
      alt: "Class Diagram Screenshot",
      caption: "Class Diagram"
    },
    {
      src: "/projects/images/code-scout/messaging.png",
      alt: "Messaging Screenshot",
      caption: "Messaging System"
    }
  ]
};