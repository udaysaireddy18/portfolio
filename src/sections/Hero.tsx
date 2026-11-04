import { certifications, education, profile, projects } from "../data/portfolio";
import { MagneticButton } from "../components/MagneticButton";
import { ParticleField } from "../components/ParticleField";
import { SocialLinks } from "../components/SocialLinks";
import { HeroAvatar } from "../components/HeroAvatar";
import { RoleRotator } from "../components/RoleRotator";
import { SplitText } from "../components/SplitText";
import {
  ArrowRightIcon,
  CameraIcon,
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  SendIcon,
} from "../components/icons";
import "./hero.css";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const internship = education.find((item) => item.degree === "Internship");

const stats = [
  { value: "2nd", label: "Year, B.Tech CSE" },
  { value: String(projects.length).padStart(2, "0"), label: "Flagship build" },
  { value: String(certifications.length).padStart(2, "0"), label: "Certifications" },
  { value: internship ? "06" : "—", label: "Month internship" },
];

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <ParticleField />

      {/* Abstract glowing orbs */}
      <div className="hero__orbs" aria-hidden="true">
        <span className="hero__orb hero__orb--a anim-drift" data-parallax="0.14" />
        <span className="hero__orb hero__orb--b anim-drift" data-parallax="0.1" />
        <span className="hero__orb hero__orb--c anim-drift" data-parallax="0.18" />
      </div>

      <div className="hero__ring" data-parallax="0.06" aria-hidden="true">
        <span className="hero__ring-line anim-spin-slow" />
        <span className="hero__ring-core" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__topline reveal">
            <span className="hero__available">
              <span className="hero__available-dot" aria-hidden="true" />
              Open to internships &amp; collaborations
            </span>
            <span className="hero__loc mono">
              <GlobeIcon width={13} height={13} />
              {profile.location}
            </span>
          </div>

          <p className="hero__name reveal" style={{ ["--reveal-delay" as string]: "60ms" }}>
            <span className="hero__name-text">{profile.nameUpper}</span>
            <span className="hero__name-rule" aria-hidden="true" />
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line">
              <SplitText text="Building with code." />
            </span>
            <span
              className="hero__title-line hero__title-line--accent grad-text grad-text--shine reveal"
              style={{ ["--reveal-delay" as string]: "240ms" }}
            >
              Capturing with <em>creativity.</em>
            </span>
          </h1>

          <p className="hero__role reveal" style={{ ["--reveal-delay" as string]: "300ms" }}>
            <span className="sr-only">{profile.professionalTitle}</span>
            <RoleRotator />
          </p>

          <p className="hero__lead reveal" style={{ ["--reveal-delay" as string]: "360ms" }}>
            {profile.heroLead}
          </p>

          <div className="hero__actions reveal" style={{ ["--reveal-delay" as string]: "440ms" }}>
            <MagneticButton onClick={() => scrollTo("projects")}>
              Explore My Work
              <ArrowRightIcon width={17} height={17} />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("contact")}>
              Contact Me
              <SendIcon width={16} height={16} />
            </MagneticButton>
          </div>

          <div className="hero__socials reveal" style={{ ["--reveal-delay" as string]: "520ms" }}>
            <SocialLinks />
          </div>

          <dl className="hero__stats reveal" style={{ ["--reveal-delay" as string]: "620ms" }}>
            {stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt className="hero__stat-value">{stat.value}</dt>
                <dd className="hero__stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__stage reveal" style={{ ["--reveal-delay" as string]: "300ms" }}>
          <div className="hero__stage-inner">
            <span className="hero__stage-halo" aria-hidden="true" />
            <span className="hero__stage-ring" aria-hidden="true" />
            <span className="hero__stage-ring hero__stage-ring--inner" aria-hidden="true" />

            <HeroAvatar />

            <span className="hero__float hero__float--a" aria-hidden="true">
              <CodeIcon width={14} height={14} />
              Python
            </span>
            <span className="hero__float hero__float--b" aria-hidden="true">
              <DatabaseIcon width={14} height={14} />
              Supabase
            </span>
            <span className="hero__float hero__float--c" aria-hidden="true">
              <CameraIcon width={14} height={14} />
              Photography
            </span>

            <div className="hero__now glass" aria-hidden="true">
              <span className="hero__now-label mono">currently</span>
              <strong>2nd year B.Tech CSE</strong>
              <span>Aditya University</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About section"
      >
        <span className="hero__scroll-mouse" aria-hidden="true" />
        <span className="hero__scroll-text mono">scroll</span>
      </button>
    </section>
  );
}
