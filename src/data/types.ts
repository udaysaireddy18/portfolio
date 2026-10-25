/**
 * Centralized types for all editable portfolio content.
 * Add new entries in `src/data/portfolio.ts` — no component changes required.
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Skill {
  name: string;
  /** Short label shown in the card corner, e.g. "lang", "db", "tool". */
  kind: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: "current" | "completed";
  highlights: string[];
}

export interface ArchitectureNode {
  label: string;
  detail: string;
}

export interface ArchitectureFlow {
  from: string;
  to: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  /** Bulleted highlights shown on the card hover reveal. */
  highlights: string[];
  /** Confirmed technologies only — never add unverified tech. */
  technologies: string[];
  /** True when more tech should be added later (shows an explicit TODO row). */
  techPending?: boolean;
  features: string[];
  github?: string;
  demo?: string;
  demoPending?: boolean;
  /** Drop image files into /public/projects/<id>/ and reference them here. */
  screenshots: string[];
  screenshotsPending?: boolean;
  architecture?: {
    nodes: ArchitectureNode[];
    flow: ArchitectureFlow[];
  };
  futureImprovements: string[];
  featured?: boolean;
  year: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

/**
 * Certificate categories. Add new certificates by picking one of these ids —
 * the card badge and the filter buttons both read from this list.
 */
export type CertificationCategory =
  | "programming"
  | "web"
  | "ai"
  | "data"
  | "cloud"
  | "database"
  | "workshops"
  | "media"
  | "other";

export interface Certification {
  /** Stable unique key, e.g. "aws-cloud-practitioner". */
  id: string;
  /** Certificate / achievement name. */
  title: string;
  /** Organization that issued it. */
  issuer: string;
  /** Drives the category badge and the filter buttons. */
  category: CertificationCategory;
  /**
   * Flexible on purpose — all of these work:
   * "2025-03-18" | "2025-03" | "2025" | "March 2025"
   * ISO formats are sorted newest-first; anything else is shown as typed.
   */
  completionDate: string;
  /** One or two sentences on what the certificate covers. */
  description: string;
  /** Image shown in the viewer and on the card, e.g. "/certificates/aws.png". */
  certificateImage?: string;
  /** PDF shown in the viewer, e.g. "/certificates/aws.pdf". */
  certificatePdf?: string;
  /** Official verification page. Leave undefined when there isn't one. */
  verificationUrl?: string;
}

export interface CertificationFilter {
  id: string;
  label: string;
  /** `null` means "show every category". */
  categories: CertificationCategory[] | null;
}