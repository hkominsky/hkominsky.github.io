export default {
  title: "Market Brief",
  description:
    "A full-stack web application for analyzing earnings call transcripts. Upload a transcript or audio file and get a structured breakdown including a plain-English summary, key financial metrics, sentiment analysis, and an AI chat interface grounded in the full transcript.",
  heroImage: {
    src: "/projects/pages/market-brief/images/market-brief.png",
    alt: "Market Brief Screenshot"
  },
  info: [
    {
      type: "link",
      label: "Live",
      url: "https://marketbrief.dev"
    },
    {
      type: "link",
      label: "GitHub",
      url: "https://github.com/hkominsky/marketbrief"
    }
  ],
  overview: [
    "Supports .txt, .mp3, and .wav file uploads, using OpenAI Whisper to transcribe audio files before analysis",
    "Implements a map-reduce chunking pipeline to handle long transcripts, with GPT-4.1-mini powering summarization, KPI extraction, and sentiment analysis across prepared statements and Q&A",
    "Features a context-aware chat interface with conversation history management, grounding answers in the full transcript",
    "Deployed with an async FastAPI backend on Render and a React/TypeScript frontend on Vercel"
  ],
  techStack: [
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "OpenAI API",
    "Whisper",
    "Pytest"
  ],
  timeline: [
    { date: "Feb 2026", description: "Built FastAPI backend with file upload endpoint supporting .txt, .mp3, and .wav" },
    { date: "Feb 2026", description: "Implemented Whisper-based audio transcription pipeline for mp3 and wav files" },
    { date: "Feb 2026", description: "Built summarizer with map-reduce chunking pipeline for long transcript handling" },
    { date: "Feb 2026", description: "Added KPI extraction and sentiment analysis across prepared statements and Q&A" },
    { date: "Mar 2026", description: "Built context-aware Q&A chat interface with conversation history management" },
    { date: "Mar 2026", description: "Added exponential backoff retry logic and quota error handling to GPT client" },
    { date: "Mar 2026", description: "Deployed frontend to Vercel and backend to Render, live at marketbrief.dev" }
  ],
  gallery: [
      {
        src: "/projects/pages/market-brief/images/upload-empty.png",
        alt: "MarketBrief Empty Upload Form",
        caption: "Upload Form"
      },
      {
        src: "/projects/pages/market-brief/images/upload-filled.png",
        alt: "MarketBrief Upload Form with Content",
        caption: "Upload Form with Transcript"
      },
      {
        src: "/projects/pages/market-brief/images/dashboard-top.png",
        alt: "MarketBrief Dashboard Top Half",
        caption: "Dashboard — Summary + KPIs"
      },
      {
        src: "/projects/pages/market-brief/images/dashboard-bottom.png",
        alt: "MarketBrief Dashboard Bottom Half",
        caption: "Dashboard — Sentiment + Q&A"
      }
    ]
};