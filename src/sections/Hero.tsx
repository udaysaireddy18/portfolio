import { profile } from "../data/portfolio";
import { MagneticButton } from "../components/MagneticButton";
import { ParticleField } from "../components/ParticleField";
import { SocialLinks } from "../components/SocialLinks";
import { HeroAvatar } from "../components/HeroAvatar";
import { RoleRotator } from "../components/RoleRotator";
import { SplitText } from "../components/SplitText";
import { ArrowRightIcon, SendIcon } from "../components/icons";
import "./hero.css";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
          <p className="hero__name reveal">
            <span className="hero__name-text">{profile.nameUpper}</span>
            <span className="hero__name-rule" aria-hidden="true" />
          </p>

          <p className="hero__role reveal" style={{ ["--reveal-delay" as string]: "80ms" }}>
            <span className="sr-only">{profile.professionalTitle}</span>
            <RoleRotator />
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line">
              <SplitText text="Building with code." />
            </span>
            <span
              className="hero__title-line grad-text grad-text--shine reveal"
              style={{ ["--reveal-delay" as string]: "240ms" }}
            >
              Capturing with creativity.
            </span>
          </h1>

          <p className="hero__lead reveal" style={{ ["--reveal-delay" as string]: "340ms" }}>
            {profile.heroLead}
          </p>

          <div className="hero__actions reveal" style={{ ["--reveal-delay" as string]: "430ms" }}>
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
        </div>

        <div className="hero__stage reveal" style={{ ["--reveal-delay" as string]: "300ms" }}>
          <HeroAvatar />
        </div>
      </div>

      <button type="button" className="hero__scroll" onClick={() => scrollTo("about")} aria-label="Scroll to About section">
        <span className="hero__scroll-mouse" aria-hidden="true" />
        <span className="hero__scroll-text mono">scroll</span>
      </button>
    </section>
  );
}