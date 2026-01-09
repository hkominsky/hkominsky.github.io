export default {
  title: "Perks FFA",
  description:
    "A feature-rich indie free-for-all game built around custom perks, deep progression, handmade 3D assets, and a fully custom UI packed with secrets to discover.",
  heroImage: {
    src: "/projects/images/perks-ffa/perks-ffa.png",
    alt: "Perks FFA"
  },
  stats: [
    { number: "2,000+", label: "Unique Players" },
    { number: "32 Minute", label: "Average Session" }
  ],
  overview: [
    "Perks FFA is a solo-developed indie project where I designed and built everything from the <strong>gameplay systems</strong> to the <strong>menus, progression, and UI</strong>. The game features <strong>40+ unique perks</strong> alongside a large web of unlocks, secrets, and player-driven discovery.",
    "I created <strong>custom 3D models in Blender</strong>, and engineered a <strong>fully custom UI system</strong> including the main menu, shop, stats, buffs, and a <strong>secret codes panel</strong> that lets players unlock <strong>dozens of hidden items</strong>."
  ],
  techStack: [
    "Unreal Engine 5", 
    "Verse", 
    "Blender", 
    "Gimp"
  ],
  gallery: [
    {
      src: "/projects/images/perks-ffa/perks-ffa.png",
      alt: "Perks FFA Gameplay",
      caption: "Core Gameplay & Perk System"
    },
    {
      src: "/projects/images/perks-ffa/perks-ffa.png",
      alt: "Custom UI",
      caption: "Hand-Built Menus, Shop, and Progression UI"
    },
    {
      src: "/projects/images/perks-ffa/perks-ffa.png",
      alt: "Custom Assets",
      caption: "Custom Blender Models & Cosmetics"
    },
    {
      src: "/projects/images/perks-ffa/perks-ffa.png",
      alt: "Systems Code",
      caption: "Large-Scale Systems & UI Code"
    }
  ],
  timeline: [
    { date: "Oct. 2025", description: "Designed the core game loop, progression structure, and UI architecture." },
    { date: "Nov. 2025", description: "Implemented 40+ perks, the unlock systems, menus, shop, and stats tracking." },
    { date: "Dec. 2025", description: "Built custom Blender assets, cosmetics, the secret codes system, and hundreds of hidden unlocks." },
    { date: "Jan. 2026", description: "Polish, balance, UI refinement, performance tuning, and public release." }
  ],
  outcomes: {
    intro: [
      "This project became a playground for combining systems design, UI engineering, and content creation into one cohesive experience.",
      "Some of the things I’m most proud of:"
    ],
    cards: [
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M7 18h10M9 8h6M9 11h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        `,
        title: "Progression Systems",
        description:
          "Designed a web of perks, progression, unlocks, shops, and secrets that all interconnect to improve retention."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5h16v10H4z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M8 19h8M12 15v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="8" cy="9" r="1" fill="currentColor"/>
          <circle cx="12" cy="9" r="1" fill="currentColor"/>
          <circle cx="16" cy="9" r="1" fill="currentColor"/>
        </svg>
        `,
        title: "Fully Custom UI",
        description:
          "Built every menu from scratch: main menu, shop, stats, buffs, cosmetics, and a secret code entry screen."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l8 4v6c0 4-3.5 6.5-8 8-4.5-1.5-8-4-8-8V7l8-4z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M9 11l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
        title: "Custom Assets",
        description:
          "Modeled and integrated original 3D assets, tying them directly into progression."
      },
      {
        icon: `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v4M5 5l3 3M19 5l-3 3M2 12h4M18 12h4M5 19l3-3M19 19l-3-3M12 18v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
        `,
        title: "Live Tuning",
        description:
          "Continuously refined balance and improved performance based on player feedback in a community forum."
      }
    ]
  }
};
