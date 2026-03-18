export default {
  title: "Endzone Analytics",
  description:
    "Bring hypothetical NFL seasons to life through intuitive data tools.",
  heroImage: {
    src: "/projects/images/endzone-analytics/endzone-analytics.png",
    alt: "Endzone Analytics Screenshot"
  },
  info: [
    {
      type: "link",
      label: "GitHub",
      url: "https://github.com/siondw/Endzone-Analytics"
    },
    {
      type: "link",
      label: "Demo",
      url: "https://youtu.be/YfkxJAHMxl8?si=ULGkTm5Ee3WTUvpP"
    }
  ],
  overview: [
    "Endzone Analytics is a full-stack application built to explore and visualize data from a hypothetical NFL season",
    "Built by a four-person team, it supports querying across 22 custom-built Flask API routes and presents insights through 18 interactive views using AppSmith",
    "The normalized PostgreSQL schema uses indexing and partitioning, Docker ensures consistent deployment, and the project was designed around four user stories covering fans, analysts, coaches, and bettors"
  ],
  techStack: [
    "Python",
    "Flask",
    "SQL",
    "Docker",
    "AppSmith",
  ],
  timeline: [
    { date: "Oct. 2023", description: "Project kickoff with planning, schema design, and API route setup" },
    { date: "Oct. 2023", description: "Developed backend logic and integrated Flask APIs with PostgreSQL" },
    { date: "Nov. 2023", description: "Built and refined frontend dashboards and interactive data views using AppSmith" },
    { date: "Nov. 2023", description: "Optimized performance, enhanced UI/UX, and conducted code reviews" },
    { date: "Dec. 2023", description: "Performed testing, bug fixes, and finalized deployment with Docker" },
  ],
  gallery: [
    {
      src: "/projects/images/endzone-analytics/teams.png",
      alt: "Season Screenshot",
      caption: "Season Schedules"
    },
    {
      src: "/projects/images/endzone-analytics/player-stats.png",
      alt: "Player Metrics Screenshot",
      caption: "Player Metrics"
    },
    {
      src: "/projects/images/endzone-analytics/draft.png",
      alt: "Draft Board Screenshot",
      caption: "Interactive Draft Board"
    },
    {
      src: "/projects/images/endzone-analytics/all-players.png",
      alt: "Player Rankings Screenshot",
      caption: "Player Rankings"
    }
  ]
};