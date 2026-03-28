/** Site copy & links — Abiodun Caleb Adesesan */

export const person = {
  displayName: "Abiodun Caleb Adesesan",
  fullName: "Abiodun Caleb Adesesan",
  role: "Software Engineer",
  tagline: "AI/ML",
} as const;

export const links = {
  github: "https://github.com/abiodunadesesan",
  linkedin: "https://www.linkedin.com/in/abioduncaleb",
  linktree: "https://linktr.ee/calebsilvanus",
  email: "mailto:abiodunadesesan@gmail.com",
} as const;

/** Footer intro — paired with signature + role */
export const footerBio = {
  body: "Thanks for stopping by! I'm Abiodun Caleb Adesesan, a Software Engineer focused on AI/ML and full-stack development. Explore my work — and stay connected as we build the future together.",
} as const;

/** Client-side placeholder before `/api/analytics` responds; API returns live label + counts. */
export const analyticsFallback = {
  asOfLabel: "Developer Analytics",
  totalVisitors: 0,
  totalVisits: 0,
  pageViews: 0,
} as const;

export type ProjectItem = {
  title: string;
  tag: string;
  blurb: string;
  href: string;
};

/** Pinned / highlighted repos — aligned with GitHub showcase */
export const projects: ProjectItem[] = [
  {
    title: "PEFT / LoRA — Sentiment Analysis",
    tag: "Python · Jupyter · Hugging Face",
    blurb:
      "Parameter-efficient fine-tuning (LoRA) on DistilBERT for IMDB sentiment classification. Baseline vs fine-tuned evaluation with Transformers & PEFT.",
    href: "https://github.com/abiodunadesesan/peft-lora-distilbert-sentiment-analysis",
  },
  {
    title: "Gourmet Bakes",
    tag: "TypeScript",
    blurb:
      "Modern TypeScript codebase for a bakery / food commerce experience — structure and UI craft tuned for real-world use.",
    href: "https://github.com/abiodunadesesan/gourmetbakes-more",
  },
  {
    title: "FinLogger Dashboard",
    tag: "JavaScript",
    blurb:
      "Finance logging and dashboard UI — data-forward interface patterns and client-side interactivity.",
    href: "https://github.com/abiodunadesesan/finlogger-dashboard",
  },
  {
    title: "E-commerce Website",
    tag: "PHP",
    blurb:
      "Full e-commerce site — catalog, flows, and server-side patterns in PHP for production-style delivery.",
    href: "https://github.com/abiodunadesesan/Ecommerce-website",
  },
  {
    title: "Study Planner — Microservices",
    tag: "JavaScript · Architecture",
    blurb:
      "Study planner built around microservices thinking — decomposition, services, and integration across the stack.",
    href: "https://github.com/abiodunadesesan/study-planner-micro-services-architecture-",
  },
  {
    title: "Contact Management",
    tag: "JavaScript",
    blurb:
      "Contact management app — CRUD, organization, and practical UI for managing people and records.",
    href: "https://github.com/abiodunadesesan/contact-management",
  },
];

export type ExperienceItem = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

/** High-level timeline — refine dates/roles from your CV anytime */
export const experience: ExperienceItem[] = [
  {
    period: "Present",
    title: "Software engineering & product builds",
    org: "Independent / academic",
    detail:
      "Shipping full-stack web apps, dashboards, and ML experiments — from TypeScript frontends to PHP backends and Jupyter research workflows.",
  },
  {
    period: "Research & ML",
    title: "Applied NLP — efficient fine-tuning",
    org: "PEFT / LoRA project",
    detail:
      "DistilBERT sentiment analysis with LoRA; evaluation against baselines using Hugging Face Transformers.",
  },
  {
    period: "Architecture",
    title: "Distributed systems mindset",
    org: "Microservices study planner",
    detail:
      "Designing planner workflows across services — practical introduction to service boundaries and integration.",
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "PHP"],
  },
  {
    label: "Web & UI",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5 Canvas", "Framer Motion"],
  },
  {
    label: "ML & data",
    items: ["Hugging Face Transformers", "PEFT / LoRA", "Jupyter", "NLP workflows"],
  },
  {
    label: "Practices",
    items: ["Microservices", "REST APIs", "Git / GitHub", "Performance-aware UI"],
  },
];
