import { useId, useState, type FormEvent } from "react";
import { profile, socials } from "../data/portfolio";
import { submitContact, validateContact, type ContactPayload } from "../utils/contact";
import { MagneticButton } from "../components/MagneticButton";
import { GithubIcon, LinkedinIcon, MailIcon, SendIcon } from "../components/icons";
import "./contact.css";

type Status = { kind: "idle" | "sending" | "done" | "error"; message?: string };

const EMPTY: ContactPayload = { name: "", email: "", message: "" };

export function Contact() {
  const formId = useId();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = (field: keyof ContactPayload) => (event: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateContact(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus({ kind: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    setStatus({ kind: "sending" });
    const result = await submitContact(values);
    setStatus({ kind: result.ok ? "done" : "error", message: result.message });
    if (result.ok) setValues(EMPTY);
  };

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "GitHub", value: socials[0].handle, href: socials[0].href, Icon: GithubIcon },
    { label: "LinkedIn", value: socials[1].handle, href: socials[1].href, Icon: LinkedinIcon },
  ];

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container contact">
        <div className="contact__intro reveal reveal--left">
          <p className="eyebrow">Contact</p>
          <h2 className="contact__title" id="contact-heading">
            Let&rsquo;s Build Something <span className="grad-text">Together.</span>
          </h2>
          <p className="lead">{profile.contactLead}</p>

          <ul className="contact__channels">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  className="contact__channel glass"
                  href={channel.href}
                  {...(channel.label === "Email" ? {} : { target: "_blank", rel: "noreferrer noopener" })}
                >
                  <span className="icon-tile" aria-hidden="true">
                    <channel.Icon />
                  </span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">{channel.label}</span>
                    <span className="contact__channel-value">{channel.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__form-wrap reveal reveal--right">
          <form className="contact__form glass" onSubmit={handleSubmit} noValidate>
            <h3 className="contact__form-title">Send a message</h3>

            <div className="field">
              <label className="field__label" htmlFor={`${formId}-name`}>
                Name
              </label>
              <input
                className="field__input"
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={update("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                required
              />
              {errors.name && (
                <p className="field__error" id={`${formId}-name-error`}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${formId}-email`}>
                Email
              </label>
              <input
                className="field__input"
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={update("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                required
              />
              {errors.email && (
                <p className="field__error" id={`${formId}-email-error`}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`${formId}-message`}>
                Message
              </label>
              <textarea
                className="field__input field__input--area"
                id={`${formId}-message`}
                name="message"
                rows={5}
                placeholder="Tell me about your idea, project or collaboration."
                value={values.message}
                onChange={update("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                required
              />
              {errors.message && (
                <p className="field__error" id={`${formId}-message-error`}>
                  {errors.message}
                </p>
              )}
            </div>

            <MagneticButton type="submit" disabled={status.kind === "sending"} strength={5}>
              {status.kind === "sending" ? "Sending…" : "Send Message"}
              <SendIcon width={16} height={16} />
            </MagneticButton>

            <p
              className={`contact__status contact__status--${status.kind}`}
              role="status"
              aria-live="polite"
            >
              {status.message ?? ""}
            </p>

            <p className="contact__hint">
              No form service is connected yet — submitting opens your mail app with the message ready.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}