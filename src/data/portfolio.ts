import type {
  Certification,
  CertificationCategory,
  CertificationFilter,
  EducationItem,
  Photo,
  Project,
  SkillCategory,
  SocialLink,
} from "./types";

/* =============================================================
   PROFILE — edit anything here, the whole site follows.
   ============================================================= */

export const profile = {
  name: "Medapati Uday Sai Reddy",
  nameUpper: "MEDAPATI UDAY SAI REDDY",
  initials: "MU",
  professionalTitle: "B.Tech CSE Student • Aspiring Software Developer • Photographer",
  role: "Student | Aspiring Software Developer | Photographer",
  brand: "Building with code. Capturing with creativity.",
  brandLines: ["Building with code.", "Capturing with creativity."],
  location: "Andhra Pradesh, India",
  university: "Aditya University",
  degree: "B.Tech in Computer Science & Engineering",
  year: "2nd Year",
  heroLead:
    "I'm a 2nd-year B.Tech CSE student at Aditya University passionate about software development, technology, data, and photography.",
  about: [
    "I am a 2nd-year B.Tech CSE student at Aditya University with a passion for technology and creativity. My goal is to become a skilled software developer while also pursuing my passion for photography.",
    "I enjoy learning new technologies, building projects, experimenting with software, and exploring creative ways to solve problems.",
  ],
  contactLead: "Have an idea, project, collaboration, or simply want to connect? Feel free to reach out.",
  email: "udaysaireddy181@gmail.com",
  url: "https://udaysaireddy18.github.io",
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", handle: "@udaysaireddy18", href: "https://github.com/udaysaireddy18" },
  {
    label: "LinkedIn",
    handle: "uday-sai-reddy-medapati",
    href: "https://www.linkedin.com/in/uday-sai-reddy-medapati-b09328425/",
  },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
];

/* =============================================================
   NAVIGATION
   ============================================================= */

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

/* =============================================================
   SKILLS — categories only, no invented proficiency levels.
   ============================================================= */

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    blurb: "Core languages used for logic, algorithms and problem solving.",
    skills: [
      { name: "C", kind: "lang" },
      { name: "C++", kind: "lang" },
      { name: "Python", kind: "lang" },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    blurb: "Structuring, styling and behaviour for the browser.",
    skills: [
      { name: "HTML", kind: "markup" },
      { name: "CSS", kind: "style" },
      { name: "JavaScript", kind: "lang" },
    ],
  },
  {
    id: "data",
    title: "Database & Backend",
    blurb: "Storing, retrieving and serving application data.",
    skills: [
      { name: "MySQL", kind: "db" },
      { name: "Supabase", kind: "db" },
      { name: "Firebase", kind: "db" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    blurb: "Version control and the daily development workflow.",
    skills: [
      { name: "Git", kind: "tool" },
      { name: "GitHub", kind: "tool" },
      { name: "VS Code", kind: "tool" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    blurb: "Shipping builds to the web and keeping them live.",
    skills: [
      { name: "Vercel", kind: "deploy" },
      { name: "Render", kind: "deploy" },
    ],
  },
  {
    id: "other",
    title: "Other",
    blurb: "Data thinking and post-production craft.",
    skills: [
      { name: "Data Analytics", kind: "data" },
      { name: "Adobe Premiere Pro", kind: "edit" },
    ],
  },
];

/* =============================================================
   EDUCATION
   Rendered top-to-bottom in the order given here.
   `status` drives the badge: "current" → live accent badge + pulsing marker,
   "completed" → static "Completed" badge.
   ============================================================= */

export const education: EducationItem[] = [
  {
    id: "diploma-cse",
    degree: "Diploma",
    field: "Computer Science and Engineering",
    institution: "Aditya College of Engineering and Technology",
    period: "2023 — 2026",
    status: "completed",
    highlights: [
      "Completed in 2026",
      "Diploma programme in Computer Science and Engineering (CSE)",
      "Progression into the B.Tech CSE programme at Aditya University",
    ],
  },
  {
    id: "internship-tecninit",
    degree: "Internship",
    field: "Python Fullstack & Web Development",
    institution: "TECNINIT, Hyderabad",
    period: "6 Months",
    status: "completed",
    highlights: [
      "6-month internship at TECNINIT, Hyderabad",
      "Learned Python Fullstack and Web Development",
      "Gained hands-on experience in fullstack development",
    ],
  },
  {
    id: "btech-cse",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: profile.university,
    period: "2026 — Present",
    status: "current",
    highlights: [
      "2nd Year undergraduate coursework",
      "Lateral entry — joined the B.Tech programme directly into the 2nd year",
      "Core areas: Data Structures, DBMS, Operating Systems, Computer Networks",
      "Building personal projects alongside coursework",
      "Active GitHub practice — projects, experiments and documentation",
    ],
  },
];

/* =============================================================
   PROJECTS
   -------------------------------------------------------------
   HOW TO ADD A PROJECT
   1. Copy an object below, give it a unique `id`.
   2. Fill summary / highlights / technologies (confirmed tech only).
   3. Add `github` and, when deployed, `demo`.
   4. Drop screenshots into  /public/projects/<id>/
      and list their paths in `screenshots`.
   5. It appears automatically in the Projects grid.
   ============================================================= */

export const projects: Project[] = [
  {
    id: "sharex",
    name: "ShareX",
    tagline: "Secure File Sharing with AI-Powered Study Assistance",
    summary:
      "ShareX is a secure file-sharing and receiving platform designed to make sharing files simple and safe. It also includes AI-powered functionality that helps students study and understand the files they receive.",
    highlights: [
      "Secure file sharing",
      "File receiving",
      "AI-powered study assistance",
      "Student-focused experience",
      "Future-ready architecture",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Node.js",
      "Express",
      "Multer",
      "Supabase",
      "PostgreSQL",
      "OpenAI SDK",
      "Groq",
      "pdf-parse",
    ],
    techPending: true,
    features: [
      "Share links with token-based access — a recipient opens a link and downloads the shared file.",
      "File receiving inbox that lists everything shared with the signed-in user.",
      "Secure upload pipeline with Express + Multer and database-backed file metadata.",
      "AI text extraction from received documents so content can be studied, not just downloaded.",
      "AI study helpers: summarisation, concept analysis, tagging, classification and a question-answering endpoint.",
      "Semantic search plus 'similar files' so related material surfaces from the same library.",
      "Dashboard view of shared files, storage activity and AI indexing status.",
      "Account registration and login flow protecting the app's routes.",
    ],
    github: "https://github.com/udaysaireddy18/shareX",
    demo: "https://udaysaireddy18.github.io/shareX/",
    screenshots: [],
    screenshotsPending: true,
    architecture: {
      nodes: [
        { label: "Browser Client", detail: "Vanilla HTML / CSS / JS pages for share, receive, upload and dashboard." },
        { label: "Express API", detail: "Node.js + Express server exposing file, share and AI routes." },
        { label: "Upload Layer", detail: "Multer handles multipart uploads from the client." },
        { label: "Supabase", detail: "@supabase/supabase-js client with PostgreSQL storage + schema." },
        { label: "AI Layer", detail: "OpenAI SDK against Groq's OpenAI-compatible endpoint, with pdf-parse for document text." },
      ],
      flow: [
        { from: "Browser Client", to: "Express API" },
        { from: "Express API", to: "Upload Layer" },
        { from: "Upload Layer", to: "Supabase" },
        { from: "Express API", to: "Supabase" },
        { from: "Express API", to: "AI Layer" },
        { from: "AI Layer", to: "Supabase" },
      ],
    },
    futureImprovements: [
      "Add a live demo deployment and link it here",
      "Add real product screenshots (upload / receive / AI study views)",
      "Confirm and document the complete technology list",
      "Expand AI study tools: quiz generation, flashcards and revision planners",
      "Strengthen sharing security with expiring links and per-file permissions",
      "Add automated tests around the API and the AI endpoints",
    ],
    featured: true,
    year: "2026",
  },
];

/* =============================================================
   PHOTOGRAPHY
   -------------------------------------------------------------
   HOW TO ADD PHOTOS
   1. Put image files in  /public/photography/
   2. Add entries below (src: "/photography/your-file.jpg").
   3. The elegant placeholder disappears automatically.
   `alt` must describe the photo for screen readers.
   ============================================================= */

export const photos: Photo[] = [];

/* =============================================================
   CERTIFICATIONS & ACHIEVEMENTS
   -------------------------------------------------------------
   HOW TO ADD A CERTIFICATE
   1. Drop the file in  /public/certificates/
   2. Append an object below. Only `id`, `title`, `issuer`,
      `category` and `completionDate` are required — the view and
      verify buttons appear automatically once their fields exist.
   3. Nothing else needs editing: cards, badges, filters, the
      viewer and the empty state all derive from this array.

   example:
   {
     id: "aws-cloud-practitioner",
     title: "AWS Certified Cloud Practitioner",
     issuer: "Amazon Web Services",
     category: "cloud",
     completionDate: "2025-03-18",
     description: "Foundational cloud architecture, services and billing.",
     certificateImage: "/certificates/aws-cloud-practitioner.png",
     certificatePdf: "/certificates/aws-cloud-practitioner.pdf",
     verificationUrl: "https://...",
   }

   Use `null` for `certificateImage` / `certificatePdf` /
   `verificationUrl` when you do not have one yet — the buttons are
   simply hidden. Never invent an organisation, date or link.
   ============================================================= */

export const certifications: Certification[] = [
  {
    id: "google-cloud-fundamentals-core-infrastructure",
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud",
    category: "cloud",
    // Date not supplied yet — left blank so nothing is invented. Fill in
    // (e.g. "2025-03" or "March 2025") when you have it.
    completionDate: "",
    description:
      "Google Cloud skill badge introducing core infrastructure concepts — compute, storage, networking, IAM and billing.",
    verificationUrl:
      "https://www.skills.google/public_profiles/43b1df38-b483-49c2-bdc3-2469b9eed201/badges/28633616",
  },
  {
    id: "advanced-prompt-engineering",
    title: "Advanced Prompt Engineering for Everyone",
    issuer: "Vanderbilt University",
    category: "ai",
    completionDate: "2026-09-28",
    description:
      "Online course authorized by Vanderbilt University and offered through Coursera covering advanced prompt engineering techniques for large language models.",
    certificatePdf: "/certificates/advanced-prompt-engineering.pdf",
    verificationUrl: "https://coursera.org/verify/39M0KK4LFOJJ",
  },
  {
    id: "agile-software-engineering",
    title: "Agile Software Engineering",
    issuer: "Aditya University",
    category: "programming",
    completionDate: "2026-09-16",
    description:
      "Online course authorized by Aditya University and offered through Coursera covering agile software engineering practices.",
    certificatePdf: "/certificates/agile-software-engineering.pdf",
    verificationUrl: "https://coursera.org/verify/RF05O43V21HS",
  },
  {
    id: "database-management-systems",
    title: "Database Management Systems",
    issuer: "Aditya University",
    category: "database",
    completionDate: "2026-09-07",
    description:
      "Online course authorized by Aditya University and offered through Coursera covering database management systems.",
    certificatePdf: "/certificates/database-management-systems.pdf",
    verificationUrl: "https://coursera.org/verify/TOLN6UOWBDY",
  },
];

/** Human labels for each category — used by the card badges. */
export const certificationCategories: Record<CertificationCategory, string> = {
  programming: "Programming",
  web: "Web Development",
  ai: "Artificial Intelligence",
  data: "Data Analytics",
  cloud: "Cloud Computing",
  database: "Database Management",
  workshops: "Workshops & Hackathons",
  media: "Photography & Video Editing",
  other: "Other Achievements",
};

/**
 * Filter buttons, in display order. Related categories are grouped behind
 * a single button (e.g. "AI & Data Analytics" covers `ai` + `data`).
 */
export const certificationFilters: CertificationFilter[] = [
  { id: "all", label: "All", categories: null },
  { id: "programming", label: "Programming", categories: ["programming"] },
  { id: "web", label: "Web Development", categories: ["web"] },
  { id: "ai-data", label: "AI & Data Analytics", categories: ["ai", "data"] },
  { id: "cloud-db", label: "Cloud & Databases", categories: ["cloud", "database"] },
  { id: "workshops", label: "Workshops & Hackathons", categories: ["workshops"] },
  { id: "media", label: "Photography & Video Editing", categories: ["media"] },
  { id: "other", label: "Other", categories: ["other"] },
];