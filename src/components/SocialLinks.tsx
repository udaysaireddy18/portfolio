import { socials } from "../data/portfolio";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import "./social-links.css";

const iconFor = (label: string) => {
  if (label === "GitHub") return <GithubIcon />;
  if (label === "LinkedIn") return <LinkedinIcon />;
  return <MailIcon />;
};

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`social-links ${compact ? "social-links--compact" : ""}`.trim()}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            className="social-link"
            href={social.href}
            {...(social.label === "Email" ? {} : { target: "_blank", rel: "noreferrer noopener" })}
            aria-label={`${social.label} — ${social.handle}`}
          >
            <span className="social-link__icon" aria-hidden="true">
              {iconFor(social.label)}
            </span>
            {!compact && <span className="social-link__label">{social.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}