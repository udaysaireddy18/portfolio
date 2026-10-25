import { useCallback, useEffect, useId, useRef, useState } from "react";
import { certificationCategories } from "../data/portfolio";
import type { Certification } from "../data/types";
import { ArrowUpRightIcon, CloseIcon, FileIcon, ShieldCheckIcon } from "./icons";
import "./certificate-viewer.css";

interface CertificateViewerProps {
  certificate: Certification | null;
  onClose: () => void;
}

type ViewerTab = "image" | "pdf";

/**
 * Opens a certificate image or PDF in a focus-trapped modal.
 * Handles missing documents gracefully: the viewer falls back to a
 * "open in a new tab" link, and broken images never trap the user.
 *
 * Give the component a `key` of the certificate id so its view state
 * resets when a different certificate is opened.
 */
export function CertificateViewer({ certificate, onClose }: CertificateViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const [tab, setTab] = useState<ViewerTab>(() =>
    certificate?.certificatePdf && !certificate.certificateImage ? "pdf" : "image",
  );
  const [imageFailed, setImageFailed] = useState(false);

  const open = certificate !== null;
  const image = certificate?.certificateImage ?? null;
  const pdf = certificate?.certificatePdf ?? null;
  const hasImage = Boolean(image) && !imageFailed;
  const hasPdf = Boolean(pdf);

  // Prefer the PDF when it is the only document available.
  const activeTab: ViewerTab = tab === "pdf" && hasPdf ? "pdf" : hasImage ? "image" : hasPdf ? "pdf" : "image";
  const fallbackHref = pdf ?? image;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [open, onClose],
  );

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (!certificate) return null;

  return (
    <div className="cv" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="cv__dialog glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="cv__head">
          <div className="cv__head-text">
            <p className="cv__kicker mono">{certificationCategories[certificate.category] ?? "Certificate"}</p>
            <h3 className="cv__title" id={titleId}>
              {certificate.title}
            </h3>
            <p className="cv__meta">
              {certificate.issuer}
              {certificate.completionDate ? <span className="cv__meta-dot" aria-hidden="true" /> : null}
              {certificate.completionDate ? <span className="mono">{certificate.completionDate}</span> : null}
            </p>
          </div>

          <div className="cv__head-actions">
            {certificate.verificationUrl && (
              <a
                className="btn btn--soft btn--sm"
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Verify ${certificate.title} on the issuing organization's site (opens in a new tab)`}
              >
                <span className="btn__label">
                  <ShieldCheckIcon width={15} height={15} />
                  Verify certificate
                </span>
              </a>
            )}
            {fallbackHref && (
              <a
                className="btn btn--primary btn--sm"
                href={fallbackHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open the certificate document in a new tab`}
              >
                <span className="btn__label">
                  Open in new tab
                  <ArrowUpRightIcon width={15} height={15} />
                </span>
              </a>
            )}
            <button ref={closeRef} type="button" className="cv__close" onClick={onClose} aria-label="Close certificate viewer">
              <CloseIcon />
            </button>
          </div>
        </header>

        {(hasImage && hasPdf) && (
          <div className="cv__tabs" role="group" aria-label="Certificate document format">
            <button
              type="button"
              className={`cv__tab ${activeTab === "image" ? "is-active" : ""}`}
              onClick={() => setTab("image")}
              aria-pressed={activeTab === "image"}
            >
              Image
            </button>
            <button
              type="button"
              className={`cv__tab ${activeTab === "pdf" ? "is-active" : ""}`}
              onClick={() => setTab("pdf")}
              aria-pressed={activeTab === "pdf"}
            >
              PDF
            </button>
          </div>
        )}

        <div className="cv__body">
          {activeTab === "image" && hasImage && (
            <figure className="cv__figure">
              <img
                className="cv__image"
                src={image as string}
                alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                onError={() => setImageFailed(true)}
              />
            </figure>
          )}

          {activeTab === "pdf" && hasPdf && (
            <iframe
              className="cv__frame"
              src={pdf as string}
              title={`${certificate.title} certificate document`}
            />
          )}

          {activeTab === "image" && !hasImage && (
            <div className="cv__placeholder">
              <span className="icon-tile" aria-hidden="true">
                <FileIcon />
              </span>
              <p className="cv__placeholder-title">
                {imageFailed ? "Image could not be loaded." : "Document not uploaded yet."}
              </p>
              <p className="cv__placeholder-text">
                {imageFailed ? (
                  <>Switch to the PDF tab, or use “Open in new tab” to view the certificate directly.</>
                ) : (
                  <>
                    Add <code>certificateImage</code> or <code>certificatePdf</code> to this entry in{" "}
                    <code>src/data/portfolio.ts</code> and it will open here automatically.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}