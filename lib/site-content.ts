/** Site copy & links — Abiodun Caleb Adesesan */

export const person = {
  displayName: "Abiodun Caleb Adesesan",
  fullName: "Abiodun Caleb Adesesan",
  /** Serif nav wordmark (Build With Tricia–style “Firstname.”) */
  navWordmark: "Caleb.",
  role: "Software Engineer",
  tagline: "AI/ML",
} as const;

export const links = {
  github: "https://github.com/abiodunadesesan",
  linkedin: "https://www.linkedin.com/in/abioduncaleb",
  instagram: "https://www.instagram.com/calebsilvanus/",
  linktree: "https://linktr.ee/calebsilvanus",
  email: "mailto:abiodunadesesan@gmail.com",
  /** WhatsApp chat — wa.me uses country code + number, no + prefix */
  whatsapp: "https://wa.me/905338448449",
  /** Calendly — 30 min discovery */
  bookCall: "https://calendly.com/abiodunadesesan/30min",
} as const;

/** Footer intro — paired with signature + role */
export const footerBio = {
  body: "Thanks for stopping by! I'm Abiodun Caleb Adesesan, a Software Engineer focused on AI/ML and full-stack development. Let's work together — view my CV and reach out to build the future together.",
} as const;

/** Client-side placeholder before `/api/analytics` responds; API returns live label + counts. */
export const analyticsFallback = {
  asOfLabel: "Developer Analytics (from 4 April 2026)",
  totalVisitors: 1,
  totalVisits: 1,
  pageViews: 1,
} as const;

export type ProjectItem = {
  title: string;
  tag: string;
  blurb: string;
  href: string;
  /** Optional local preview image (served from /public). */
  previewImage?: string;
};

export type CaseStudy = {
  title: string;
  year: string;
  category: string;
  href: string;
  /** Optional local preview image (served from /public). */
  previewImage?: string;
  problem: string;
  approach: string[];
  challenges: string[];
  outcomes: string[];
  tech: string[];
};

/** Pinned / highlighted repos — aligned with GitHub showcase */
export const projects: ProjectItem[] = [
  {
    title: "Paris American International University",
    tag: "Professional Client Work · WordPress · Elementor",
    blurb:
      "Developed a modern, visually engaging web presence for the Paris American International University. Built using WordPress and Elementor to ensure a highly responsive, optimized, and easily manageable platform for the institution.",
    href: "https://parisamerican.org",
    previewImage: "/previews/parisamerican.png",
  },
  {
    title: "Study in North Cyprus",
    tag: "Professional Client Work · WordPress · Elementor",
    blurb:
      "Educational consultancy platform crafted to guide international students. Custom-built with WordPress and Elementor for a seamless, conversion-focused user experience with modern aesthetics.",
    href: "https://studyinnc.com",
    previewImage: "/previews/studyinnc.png",
  },
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
    previewImage: "/previews/gourmetbakes.png",
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
    tag: "Professional Project · JavaScript",
    blurb:
      "Contact management system developed at a professional architecture level — featuring CRUD operations, record organization, and practical, production-ready UI.",
    href: "https://github.com/abiodunadesesan/contact-management",
  },
];

/** Recruiter/client-friendly narrative case studies (3–5). */
export const caseStudies: CaseStudy[] = [
  {
    title: "Paris American International University",
    year: "2026",
    category: "Web Design & Build",
    href: "https://parisamerican.org",
    previewImage: "/previews/parisamerican.png",
    problem:
      "A university site needed a modern, mobile-first presence with clear program discovery and a maintainable admin workflow.",
    approach: [
      "Designed an information architecture focused on prospective-student questions.",
      "Implemented responsive templates in WordPress + Elementor with reusable sections.",
      "Optimized assets and layout for fast first load and stable CLS.",
    ],
    challenges: [
      "Balancing marketing-style visuals with academic clarity.",
      "Keeping templates flexible for non-technical updates.",
    ],
    outcomes: [
      "Clearer navigation and faster page interactions on mobile.",
      "Easier content updates for admins via modular sections.",
    ],
    tech: ["WordPress", "Elementor", "Performance optimization", "SEO basics"],
  },
  {
    title: "Study in North Cyprus",
    year: "2026",
    category: "Conversion-focused Website",
    href: "https://studyinnc.com",
    previewImage: "/previews/studyinnc.png",
    problem:
      "An education consultancy needed a site that builds trust quickly and guides visitors to inquiry actions.",
    approach: [
      "Built a homepage that leads with value proposition and clear CTAs.",
      "Created landing-page style sections for services, proof, and FAQs.",
      "Improved readability and hierarchy across devices.",
    ],
    challenges: ["Ensuring the content stays scannable without losing detail."],
    outcomes: ["Stronger CTA visibility and a clearer inquiry path."],
    tech: ["WordPress", "Elementor", "UI/UX", "Analytics-ready structure"],
  },
  {
    title: "PEFT / LoRA — Sentiment Analysis",
    year: "2025",
    category: "Applied ML (NLP)",
    href: "https://github.com/abiodunadesesan/peft-lora-distilbert-sentiment-analysis",
    problem:
      "Fine-tune a transformer for sentiment classification efficiently (lower compute/cost) while tracking baseline vs tuned performance.",
    approach: [
      "Set up a baseline DistilBERT evaluation on IMDB.",
      "Applied LoRA via PEFT and compared metrics against the baseline.",
      "Documented the experiment steps for reproducibility.",
    ],
    challenges: ["Keeping training stable while remaining compute-efficient."],
    outcomes: ["A repeatable workflow for efficient fine-tuning experiments."],
    tech: ["Python", "Hugging Face Transformers", "PEFT/LoRA", "Jupyter"],
  },
  {
    title: "Gourmet Bakes",
    year: "2025",
    category: "Product / Commerce UI",
    href: "https://github.com/abiodunadesesan/gourmetbakes-more",
    previewImage: "/previews/gourmetbakes.png",
    problem:
      "Create a clean, appetizing commerce experience with strong hierarchy, mobile-first layout, and conversion-friendly CTAs.",
    approach: [
      "Designed a homepage layout optimized for scanning categories and key actions.",
      "Built reusable UI sections and components for rapid iteration.",
      "Focused on contrast, spacing, and responsive typography for readability.",
    ],
    challenges: ["Balancing visual richness with speed and layout stability."],
    outcomes: ["A modern UI foundation suitable for a real productized food/commerce build."],
    tech: ["TypeScript", "React UI patterns", "Responsive design"],
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
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML5 Canvas",
      "Framer Motion",
      "WordPress",
      "Elementor"
    ],
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

export const services: { title: string; description: string; bullets: string[] }[] = [
  {
    title: "Full‑stack product builds",
    description: "From idea to shipped feature — clean UI, reliable APIs, and production-ready delivery.",
    bullets: ["Next.js / React apps", "API design (REST)", "Performance + accessibility"],
  },
  {
    title: "AI/ML prototyping",
    description: "Experiment-driven ML work — evaluation, iteration, and pragmatic integration into products.",
    bullets: ["NLP workflows", "Fine‑tuning (PEFT/LoRA)", "Data-first iteration"],
  },
  {
    title: "UI/UX engineering",
    description: "Design-to-code execution that feels polished: motion, hierarchy, responsiveness, and clarity.",
    bullets: ["Component systems", "Interaction design", "Mobile-first layout"],
  },
];

export const processSteps: { step: string; title: string; body: string }[] = [
  {
    step: "1",
    title: "Align on goals",
    body: "We define the outcome, audience, constraints, and success metrics — then pick the fastest path to impact.",
  },
  {
    step: "2",
    title: "Design the solution",
    body: "Information architecture, UI structure, and technical approach — optimized for clarity and maintainability.",
  },
  {
    step: "3",
    title: "Build & iterate",
    body: "Ship in slices, validate quickly, and keep quality high (performance, accessibility, tests where needed).",
  },
  {
    step: "4",
    title: "Launch & improve",
    body: "Handoff docs, analytics readiness, and follow-up improvements based on real usage.",
  },
];

export const testimonials: { name: string; org?: string; quote: string }[] = [
  {
    name: "Client partner",
    org: "Education",
    quote:
      "Clear communication, fast turnaround, and the final site felt premium on both desktop and mobile.",
  },
  {
    name: "Teammate",
    org: "Engineering",
    quote:
      "Strong sense of UI detail, but also pragmatic about performance and maintainable implementation.",
  },
];

export const posts: { title: string; date: string; blurb: string; href?: string }[] = [
  {
    title: "Efficient fine‑tuning with LoRA: what to track",
    date: "2026",
    blurb:
      "A practical checklist for evaluating PEFT runs: baseline setup, metrics, and common failure modes.",
  },
  {
    title: "Designing dashboards that scan well",
    date: "2026",
    blurb:
      "Hierarchy, whitespace, and interaction patterns that make data UIs feel effortless to use.",
  },
];

export const proofStats: { label: string; value: string; detail?: string }[] = [
  { label: "Shipped sites", value: "10+", detail: "Client + personal builds" },
  { label: "Featured case studies", value: "4", detail: "Problem → approach → outcomes" },
  { label: "Response time", value: "24–48h", detail: "Typical reply window" },
];

export const reasons: { title: string; body: string }[] = [
  {
    title: "Clarity first",
    body: "I make it obvious what you do, who it’s for, and what to do next—especially on mobile.",
  },
  {
    title: "Design + engineering",
    body: "Polished UI and motion, but implemented with performance, accessibility, and maintainability in mind.",
  },
  {
    title: "Fast iteration",
    body: "I ship in slices, get feedback early, and avoid big-bang surprises late in the project.",
  },
  {
    title: "Pragmatic AI/ML",
    body: "Experiment-driven ML work that integrates cleanly into products—evaluation and trade-offs included.",
  },
  {
    title: "Reliability",
    body: "Clean handoff, documented decisions, and an approach that keeps momentum high.",
  },
  {
    title: "Business outcomes",
    body: "Every section exists to support a goal: trust, clarity, conversion, or decision-making.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What kind of roles or projects are you open to?",
    a: "Software engineering roles (frontend/full‑stack) and freelance builds where you need polished UI, reliable APIs, and clear delivery.",
  },
  {
    q: "What stacks do you specialize in?",
    a: "TypeScript, React, Next.js, Node.js, Python for ML, plus WordPress/Elementor for marketing sites when that’s the right tool.",
  },
  {
    q: "Can you work from an existing design?",
    a: "Yes—Figma or reference sites are great. I implement pixel-tight UI with performance, accessibility, and maintainability in mind.",
  },
  {
    q: "Do you offer both design and development?",
    a: "I’m primarily an engineer: I execute strong UI/UX in code. For brand-new visual identity, I can collaborate with a designer or follow your brand kit.",
  },
  {
    q: "How do you run projects?",
    a: "A short alignment call, a simple plan, then milestones with clear demos—so you always know what’s shipping next.",
  },
  {
    q: "How long does a project usually take?",
    a: "Depends on scope. A focused landing or feature slice can be days–weeks; larger builds are phased. I’ll give a realistic timeline after scoping.",
  },
  {
    q: "Do you do AI/ML end-to-end?",
    a: "For prototypes and applied NLP (e.g. fine-tuning, evaluation)—yes. I focus on reproducible experiments and pragmatic integration.",
  },
  {
    q: "Can you redesign or improve an existing site?",
    a: "Yes—performance, structure, conversion paths, and refactors. We’ll prioritize what moves the needle first.",
  },
];

/** “Let’s Grow Together” style offers (starting-from; adjust to your real rates). */
/** Rotating CTA verbs (Let’s ___ …) — see LetsConnectSection + VerbCrossFade. */
export const connectVerbs = ["build", "design", "ship"] as const;

export const connectOffers: {
  title: string;
  priceLabel: string;
  description: string;
}[] = [
  {
    title: "Full‑stack web build",
    priceLabel: "Starting from $899",
    description: "High-performance Next.js/React builds tailored for clarity, speed, and SEO-ready structure.",
  },
  {
    title: "AI/ML prototype",
    priceLabel: "Starting from $1,299",
    description: "Applied NLP or lightweight ML features with evaluation, iteration, and integration guidance.",
  },
];

export const recentHighlights = caseStudies.slice(0, 4).map((c) => ({
  title: c.title,
  year: c.year,
  category: c.category,
  href: c.href,
  previewImage: c.previewImage,
}));

/** About page — Tricia-style hero copy (adapt to your story anytime). */
export const aboutPage = {
  headline:
    "Software engineer with an AI/ML focus—shipping high-performance sites and products that are clear, fast, and conversion-minded.",
  sub: "Design-minded engineering: I care how things look, feel, and perform under real users.",
  tagline: "Websites and systems guided by outcomes.",
  location: "Open to remote & hybrid roles worldwide",
  availability: "Available for work",
  /** Eyebrow next to portrait — full name */
  introChip: "I am Abiodun Caleb Adesesan",
  /** Short line under the chip (call me Caleb) */
  casualCallout: "You can call me Caleb.",
  bio:
    "I'm Abiodun Caleb Adesesan. I combine full-stack delivery (React, Next.js, APIs) with practical ML/NLP work—so your product can be both polished and intelligent. I collaborate through clear milestones, honest trade-offs, and steady communication.",
} as const;

/** About page — recommendations + credentials block header copy */
export const recommendationsCredentialsSection = {
  chip: "Recommendations & credentials",
  title: "Recommendations & credentials",
  lead:
    "I hold a B.Sc. in Software Engineering from Final International University and have received formal recommendations recognizing my academic dedication, helpfulness, and professionalism. Selected references are available upon request.",
} as const;

/** Short “endorsed by” lines — third-party, scannable (optional visual strip on About). */
export const endorsedByLines: string[] = [
  "Final International University recommendation letter recognizing academic dedication, helpfulness, and leadership qualities.",
  "Bachelor’s degree in Software Engineering from Final International University.",
];

/**
 * Short excerpts only — recommender name & role; no full letters on the public site.
 */
export const recommendationExcerpts: {
  kind: "professional" | "academic" | "institutional";
  institution: string;
  recommender: string;
  role: string;
  quotes: string[];
  paraphrased?: boolean;
  contextNote?: string;
  /** Shown under the excerpts for that card (e.g. availability of full letter). */
  footnote?: string;
}[] = [
  {
    kind: "professional",
    institution: "Study in North Cyprus",
    recommender: "Dr. Selman Arslanbas",
    role: "Founder",
    quotes: [
      "Caleb contributed directly to the design, development, and maintenance of our company websites… demonstrating strong technical ability, problem-solving skills, and analytical thinking.",
    ],
    contextNote:
      "The letter also references work spanning Study in North Cyprus and Paris American International University — professional, reliable, and adaptable delivery.",
  },
  {
    kind: "academic",
    institution: "Final International University",
    recommender: "Asst. Prof. Dr. Ibrahim Adesola",
    role: "Head of Computer Engineering Department",
    quotes: [
      "Adesesan has shown himself to be a dedicated and innovative student… with strong technical expertise, leadership experience, and passion for AI.",
    ],
    contextNote:
      "References software engineering coursework, a final-year e-commerce project, and leadership — strong potential in AI/ML-oriented work.",
  },
  {
    kind: "institutional",
    institution: "Final International University",
    recommender: "Sunel Gazi",
    role: "Assistant to the Advisor of the Board of Trustees, Final International University",
    quotes: [
      "Caleb was a constant visitor to the International Office, offering his assistance wherever possible and always willing to help and guide freshman students…",
      "His dedication to his academic studies, rapport with fellow students, and compassionate nature will guarantee his success…",
    ],
    footnote: "Full recommendation available on request.",
  },
];

/** Education — factual only; no certificate images on the page */
export const educationCredential = {
  label: "Education",
  degree: "B.Sc. in Software Engineering",
  institution: "Final International University",
  year: "2025",
  description:
    "The degree certificate documents the Bachelor of Science award in Software Engineering from the Faculty of Engineering.",
} as const;

/** How to obtain full letters */
export const referencesAvailability = {
  title: "References & verification",
  description:
    "Full recommendation letters and degree verification details are available on request for recruiters and hiring teams — shared with appropriate redaction to protect recommender contact information.",
  footnote: "Use the contact form to request copies.",
  ctaLabel: "Request via contact",
  ctaHref: "/contact",
} as const;

/** About / contact pills (stack snapshot). */
export const aboutSkillPills = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "WordPress",
  "ML / NLP",
  "REST APIs",
  "Performance",
] as const;

/** Contact page hero stats (keep truthful; adjust anytime). */
export const contactPageStats: { value: string; label: string }[] = [
  { value: "10+", label: "Shipped builds" },
  { value: "4", label: "Featured case studies" },
  { value: "5.0", label: "Avg. feedback" },
];
