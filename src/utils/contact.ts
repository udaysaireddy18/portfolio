import { profile } from "../data/portfolio";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  /** Message shown to the visitor under the form. */
  message: string;
  /** True when the message was handed to the visitor's mail client. */
  usedFallback: boolean;
}

/**
 * ---------------------------------------------------------------------------
 * CONNECT A BACKEND / EMAIL SERVICE
 * ---------------------------------------------------------------------------
 * Set `endpoint` to a form endpoint and the form will POST JSON to it:
 *
 *   • Formspree      https://formspree.io/f/<your-id>
 *   • Web3Forms      https://api.web3forms.com/submit        (add accessKey)
 *   • Getform        https://getform.io/f/<your-id>
 *   • EmailJS        (call emailjs.send instead — see note below)
 *   • Your own API   https://your-domain.com/api/contact
 *
 * While `endpoint` is null the form validates input, then opens the visitor's
 * mail client with the message pre-filled — no data is lost and no fake
 * "message sent" state is shown.
 */
const endpoint: string | null = null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validateContact(payload: ContactPayload): Partial<Record<keyof ContactPayload, string>> {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  if (payload.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(payload.email.trim())) errors.email = "Please enter a valid email address.";
  if (payload.message.trim().length < 10) errors.message = "Please write at least 10 characters.";

  return errors;
}

const buildMailto = (payload: ContactPayload) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${payload.name}`)}` +
  `&body=${encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`)}`;

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return {
          ok: false,
          usedFallback: false,
          message: "The message could not be sent. Please email me directly instead.",
        };
      }

      return {
        ok: true,
        usedFallback: false,
        message: "Thanks! Your message has been sent — I'll get back to you soon.",
      };
    } catch {
      return {
        ok: false,
        usedFallback: false,
        message: "Network error while sending. Please email me directly instead.",
      };
    }
  }

  // No endpoint configured — hand the message to the visitor's mail client.
  window.location.href = buildMailto(payload);
  return {
    ok: true,
    usedFallback: true,
    message: `No form service is connected yet, so your email app was opened with the message ready to send to ${profile.email}.`,
  };
}