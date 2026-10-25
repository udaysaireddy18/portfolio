import { profile, socials } from "../data/portfolio";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import "./footer.css";

const iconFor = (label: string) => {
  if (label === "GitHub") return <GithubIcon />;
  if (label === "LinkedIn") return <LinkedinIcon />;
  return <MailIcon />;
};

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top glass reveal">
          <div className="footer__brand">
            <p className="footer__name">{profile.nameUpper}</p>
            <p className="footer__brand-line">
              Building with code. <span className="grad-text">Capturing with creativity.</span>
            </p>
          </div>

          <nav className="footer__socials" aria-label="Social links">
            {socials.map((social, index) => (
              <a
                key={social.label}
                className="footer__social"
                style={{ ["--i" as string]: index }}
                href={social.href}
                {...(social.label === "Email"
                  ? {}
                  : { target: "_blank", rel: "noreferrer noopener" })}
                aria-label={`${social.label} — ${social.handle}`}
              >
                <span className="footer__social-icon" aria-hidden="true">
                  {iconFor(social.label)}
                </span>
                <span>{social.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <p className="footer__copy">
            &copy; {YEAR} {profile.name}. All rights reserved.
          </p>
          <a className="footer__to-top" href="#home">
            Back to top
            <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}