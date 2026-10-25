import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navLinks, profile } from "../data/portfolio";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";
import "./navbar.css";

const SECTION_IDS: string[] = navLinks.map((link) => link.id);

export function Navbar() {
  const active = useScrollSpy(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // The drawer stays mounted for a moment on close so its fade-out can play.
  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setDrawerMounted(true);
    setMenuOpen(true);
  };

  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDrawerMounted(false), 320);
    if (restoreFocus) menuButtonRef.current?.focus();
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(y / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu on Escape, and restore focus to the trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = (id: string) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Move the sliding indicator under the active desktop link.
  useLayoutEffect(() => {
    const el = linkRefs.current.get(active);
    const nav = el?.parentElement;
    if (!el || !nav) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current.get(active);
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ ["--progress" as string]: progress }}
        aria-hidden="true"
      />

      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner container container--wide">
          <a
            className="nav__brand"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goTo("home");
            }}
          >
            <span className="nav__mark" aria-hidden="true">
              {profile.initials}
            </span>
            <span className="nav__brand-text">
              <span className="nav__brand-name">Uday Sai Reddy</span>
              <span className="nav__brand-role">Developer · Photographer</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Section navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                ref={(node) => {
                  if (node) linkRefs.current.set(link.id, node);
                  else linkRefs.current.delete(link.id);
                }}
                href={`#${link.id}`}
                className={`nav__link ${active === link.id ? "is-active" : ""}`}
                aria-current={active === link.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="nav__burger"
              onClick={() => (menuOpen ? closeMenu() : openMenu())}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <MenuIcon className="nav__burger-open" /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Animated active-section indicator */}
        <span
          className="nav__indicator"
          style={{
            translate: `${indicator.left + indicator.width / 2}px 0`,
            width: `${indicator.width}px`,
            opacity: indicator.width > 0 ? 1 : 0,
          }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
        hidden={!drawerMounted}
      >
        <div className="mobile-nav__panel glass">
          <div className="mobile-nav__head">
            <span className="mobile-nav__label">Navigate</span>
            <button
              type="button"
              className="mobile-nav__close"
              onClick={() => closeMenu()}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          <ul className="mobile-nav__list">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ ["--i" as string]: i }}>
                <a
                  href={`#${link.id}`}
                  className={`mobile-nav__link ${active === link.id ? "is-active" : ""}`}
                  aria-current={active === link.id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.id);
                  }}
                >
                  <span className="mobile-nav__num mono">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}