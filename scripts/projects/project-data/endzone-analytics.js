export default {
  title: "Endzone Analytics",
  description:
    "Bring hypothetical NFL seasons to life through intuitive data tools.",
  heroImage: {
    src: "/projects/images/endzone-analytics/endzone-analytics.png",
    alt: "Endzone Analytics Screenshot"
  },
  stats: [
    { number: "600+", label: "Players" },
    { number: "250+", label: "Games" },
    { number: "32", label: "Teams" }
  ],
  overview: [
    "Endzone Analytics is a full-stack application built to explore and visualize data from a hypothetical NFL season.",
    "Designed around a robust PostgreSQL database, the project supports querying across <strong>22 custom-built Flask API routes</strong> and presents insights through <strong>18 interactive views</strong> using AppSmith."
  ],
  techStack: [
    "Python",
    "Flask",
    "SQL",
    "Docker",
    "AppSmith",
  ],
  timeline: [
    { date: "Oct. 2023", description: "Project kickoff with planning, schema design, and API route setup." },
    { date: "Oct. 2023", description: "Developed backend logic and integrated Flask APIs with PostgreSQL." },
    { date: "Nov. 2023", description: "Built and refined frontend dashboards and interactive data views using AppSmith." },
    { date: "Nov. 2023", description: "Optimized performance, enhanced UI/UX, and conducted code reviews." },
    { date: "Dec. 2023", description: "Performed testing, bug fixes, and finalized deployment with Docker." },
  ],
  gallery: [
    {
      src: "/projects/images/endzone-analytics/teams.png",
      alt: "Games Page Screenshot",
      caption: "Season Schedules"
    },
    {
      src: "/projects/images/endzone-analytics/player-stats.png",
      alt: "Player Stats Page Screenshot",
      caption: "Player Metrics"
    },
    {
      src: "/projects/images/endzone-analytics/draft.png",
      alt: "Draft Board Page Screenshot",
      caption: "Interactive Draft Board"
    },
    {
      src: "/projects/images/endzone-analytics/all-players.png",
      alt: "All Players Page Screenshot",
      caption: "Player Rankings"
    }
  ],
  outcomes: {
    intro: [
      "The application emphasized clean data modeling and developer collaboration",
      "Here are the major highlights of the build:"
    ],
    cards: [
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 11H17.8C18.9201 11 19.4802 11 19.908 11.218C20.2843 11.4097 20.5903 11.7157 20.782 12.092C21 12.5198 21 13.0799 21 14.2V21M13 21V6.2C13 5.0799 13 4.51984 12.782 4.09202C12.5903 3.71569 12.2843 3.40973 11.908 3.21799C11.4802 3 10.9201 3 9.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.0799 3 6.2V21M22 21H2M6.5 7H9.5M6.5 11H9.5M6.5 15H9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
        title: "Scalable Architecture",
        description:
          "Designed a highly relational, normalized schema using indexing, "
          + "partitioning, and clear relationships."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0, 1)">
                <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.5 9.5L7.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>
        `,
        title: "Containerization",
        description:
          "Utilized Docker to streamline development and ensure "
          + "consistency across deployment environments."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.2C21 14.8802 21 15.7202 20.673 16.362C20.3854 16.9265 19.9265 17.3854 19.362 17.673C18.7202 18 17.8802 18 16.2 18H13.6837C13.0597 18 12.7477 18 12.4492 18.0613C12.1844 18.1156 11.9282 18.2055 11.6875 18.3285C11.4162 18.4671 11.1725 18.662 10.6852 19.0518L8.29976 20.9602C7.88367 21.2931 7.67563 21.4595 7.50054 21.4597C7.34827 21.4599 7.20422 21.3906 7.10923 21.2716C7 21.1348 7 20.8684 7 20.3355V18C6.07003 18 5.60504 18 5.22354 17.8978C4.18827 17.6204 3.37962 16.8117 3.10222 15.7765C3 15.395 3 14.93 3 14V7.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
        title: "Collaboration",
        description:
          "Built by a four-person team using GitHub and "
          + " agile practices to ensure smooth version control."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <g transform="translate(0, 5)">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
                <path d="M4 19c1.5-2.5 5.5-4 8-4s6.5 1.5 8 4" />
            </g>
        </svg>
        `,
        title: "User Focus",
        description:
          "Focused on four user stories: fans, analysts, coaches, and bettors, "
          + "ensuring each can utilize the data for their needs."
      }
    ]
  }
};