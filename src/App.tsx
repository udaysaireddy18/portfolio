import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { TechMarquee } from "./components/TechMarquee";
import { BackToTop } from "./components/BackToTop";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Education } from "./sections/Education";
import { Projects } from "./sections/Projects";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useParallax } from "./hooks/useParallax";
import { useCursorGlow } from "./hooks/useCursorGlow";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/animations.css";
import "./styles/effects.css";
import "./styles/app.css";

export default function App() {
  // Reveals every `.reveal` element as it scrolls into view.
  useScrollReveal();
  // Drifts elements marked `data-parallax` as the page scrolls.
  useParallax();
  // A soft spotlight that follows the pointer on fine-pointer devices.
  useCursorGlow();

  return (
    <>
      <span className="cursor-glow" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      <BackToTop />
    </>
  );
}