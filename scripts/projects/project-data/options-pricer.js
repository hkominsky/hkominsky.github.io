export default {
  title: "Options Pricer",
  description:
    "A Jupyter notebook that prices European call options using Black-Scholes and Monte Carlo simulation, with live market data and an implied volatility solver.",
  heroImage: {
    src: "/projects/pages/options-pricer/images/pricing.png",
    alt: "Options Pricer Screenshot"
  },
  info: [
    {
      type: "link",
      label: "GitHub",
      url: "https://github.com/hkominsky/options-pricer"
    }
  ],
  overview: [
    "An options pricing notebook that fetches live spot prices, historical volatility, and ATM market prices from yfinance",
    "European call options are priced using both Black-Scholes and Monte Carlo simulations, with results compared against the live market price",
    "An implied volatility solver backs out the vol the market is pricing in, exposing the premium above historical volatility for any given contract"  ],
  techStack: [
    "Python",
    "NumPy",
    "SciPy",
    "Pandas",
    "Matplotlib",
    "yfinance",
    "Jupyter"
  ],
  timeline: [
    { date: "Nov 2024", description: "Implemented Black-Scholes and Monte Carlo pricing functions with helper methods" },
    { date: "Dec 2024", description: "Built live data integration via yfinance for spot price, historical vol, and ATM chain" },
    { date: "Dec 2024", description: "Added interactive widgets with a refresh button for live re-fetching by ticker" },
    { date: "Dec 2024", description: "Built MC convergence plot showing price stabilization and SE decay toward BS" },
    { date: "Dec 2024", description: "Implemented implied volatility solver and vol sensitivity visualization" }
  ],
  gallery: [
    {
      src: "/projects/pages/options-pricer/images/pricing.png",
      alt: "Monte Carlo vs Black-Scholes Screenshot",
      caption: "Monte Carlo vs Black-Scholes"
    },
    {
      src: "/projects/pages/options-pricer/images/implied-vol.png",
      alt: "Implied Volatility Solver Screenshot",
      caption: "Implied Vol Solver"
    }
  ]
};