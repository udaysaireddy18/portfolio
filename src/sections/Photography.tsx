import { photos } from "../data/portfolio";
import { SectionHeading } from "../components/SectionHeading";
import { CameraIcon } from "../components/icons";
import "./photography.css";

const FRAMES = [
  { id: "slot-1", ratio: "3 / 2" },
  { id: "slot-2", ratio: "4 / 5" },
  { id: "slot-3", ratio: "1 / 1" },
  { id: "slot-4", ratio: "16 / 10" },
  { id: "slot-5", ratio: "3 / 2" },
  { id: "slot-6", ratio: "4 / 5" },
];

export function Photography() {
  const hasPhotos = photos.length > 0;

  return (
    <section className="section" id="photography" aria-labelledby="photography-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Photography"
          title={<span id="photography-heading">Through My Lens</span>}
          lead="Capturing moments beyond the screen."
          aside={
            <span className="badge">
              <CameraIcon width={13} height={13} />
              {hasPhotos ? `${photos.length} photographs` : "collection in progress"}
            </span>
          }
        />

        {hasPhotos ? (
          <ul className="photo__grid">
            {photos.map((photo, index) => (
              <li
                className={`photo__item reveal photo__item--${index % 6}`}
                key={photo.id}
                style={{ ["--reveal-delay" as string]: `${(index % 6) * 70}ms` }}
              >
                <figure className="photo__frame">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption className="photo__caption">{photo.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="photo__grid">
              {FRAMES.map((frame, index) => (
                <li
                  className={`photo__item photo__item--${index} reveal`}
                  key={frame.id}
                  style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
                >
                  <div className="photo__placeholder" style={{ aspectRatio: frame.ratio }}>
                    <span className="photo__focus" aria-hidden="true" />
                    <span className="photo__frame-label mono">
                      <CameraIcon width={14} height={14} />
                      frame {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </li>
              ))}
            </div>

            <div className="pending photo__pending reveal">
              <p className="pending__title">Photography collection coming soon.</p>
              <p className="pending__text">
                No photographs are published yet — these frames are placeholders, not stock images.
                Add your own work and it will take their place automatically.
              </p>
              <p className="pending__hint">
                Drop images into <code>public/photography/</code> and list them in{" "}
                <code>src/data/portfolio.ts</code> → <code>photos</code>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}