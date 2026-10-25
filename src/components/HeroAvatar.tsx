import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import { useNarration } from "../hooks/useNarration";
import { PlayIcon, StopIcon } from "./icons";
import "./hero-avatar.css";

const INTRO = `Hi there! I'm ${profile.name}, a ${profile.degree} student at ${profile.university}, an aspiring software developer and photographer. Welcome to my portfolio. Scroll down to explore my skills, education, and projects.`;

/**
 * Friendly full-body boy character built entirely from SVG, animated in
 * layers: a one-shot cinematic entrance (rise, staggered pop of head and
 * arms, sparkle burst), a continuous idle float with breathing, hair sway,
 * a responsive ground shadow and randomised blinks, plus a waving arm and
 * irregular lip-sync while the voice-over plays.
 */
export function HeroAvatar() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const speakingRef = useRef(false);

  // Fires from the speech engine's own start event, so it is safe here.
  const handleSpeechStart = useCallback(() => {
    setHasPlayed(true);
    try {
      sessionStorage.setItem("usr-intro-played", "1");
    } catch {
      /* private mode — ignore */
    }
  }, []);

  const { supported, speaking, start, stop } = useNarration(INTRO, handleSpeechStart);

  // Mirror the live speech state into a ref for the autoplay guard below.
  useEffect(() => {
    speakingRef.current = speaking;
  }, [speaking]);

  // Try the intro once per session; if nothing starts, reveal the button prompt.
  useEffect(() => {
    if (!supported) return;
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem("usr-intro-played") === "1";
    } catch {
      /* ignore */
    }
    if (alreadyPlayed) return;

    const kick = window.setTimeout(() => start(), 1000);
    const guard = window.setTimeout(() => {
      if (!speakingRef.current) setNeedsGesture(true);
    }, 2400);
    return () => {
      window.clearTimeout(kick);
      window.clearTimeout(guard);
    };
  }, [supported, start]);

  // Natural, irregular blinking — randomised gaps with the odd double blink.
  useEffect(() => {
    let alive = true;
    let gap = 0;
    let close = 0;
    const schedule = () => {
      gap = window.setTimeout(
        () => {
          if (!alive) return;
          setBlinking(true);
          close = window.setTimeout(() => {
            if (!alive) return;
            setBlinking(false);
            schedule();
          }, 120);
        },
        1800 + Math.random() * 3800,
      );
    };
    schedule();
    return () => {
      alive = false;
      window.clearTimeout(gap);
      window.clearTimeout(close);
    };
  }, []);

  const toggle = () => {
    if (speaking) {
      stop();
    } else {
      setNeedsGesture(false);
      start();
    }
  };

  let actionLabel = "Play intro";
  if (hasPlayed) actionLabel = "Replay intro";
  if (speaking) actionLabel = "Stop";

  return (
    <figure className={`avatar ${speaking ? "is-talking" : ""}`.trim()}>
      <div className="avatar__frame">
        <svg
          className="avatar__svg"
          viewBox="0 0 200 300"
          role="img"
          aria-label={`Illustrated cartoon character of ${profile.name} introducing the portfolio`}
        >
          <defs>
            <linearGradient id="boy-skin" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#eef3ff" />
              <stop offset="100%" stopColor="#c6d7f7" />
            </linearGradient>
            <linearGradient id="boy-hair" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#413763" />
              <stop offset="100%" stopColor="#241f3d" />
            </linearGradient>
            <linearGradient id="boy-shirt" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6f9bf0" />
              <stop offset="100%" stopColor="#8a7ae6" />
            </linearGradient>
            <linearGradient id="boy-shorts" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4a5aa8" />
              <stop offset="100%" stopColor="#3d4a8f" />
            </linearGradient>
            <radialGradient id="boy-glow" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stopColor="rgba(181, 163, 230, 0.48)" />
              <stop offset="55%" stopColor="rgba(123, 160, 218, 0.2)" />
              <stop offset="100%" stopColor="rgba(123, 160, 218, 0)" />
            </radialGradient>
          </defs>

          <circle className="boy__aura" cx="100" cy="150" r="100" />
          <ellipse className="boy__glow" cx="100" cy="150" rx="96" ry="140" fill="url(#boy-glow)" />

          <g className="boy__shadow-enter">
            <ellipse className="boy__shadow" cx="100" cy="262" rx="38" ry="6" />
          </g>

          <g className="boy__enter">
            <g className="boy__body">
              {/* legs + feet */}
              <line className="boy__limb" x1="88" y1="182" x2="84" y2="236" />
              <line className="boy__limb" x1="112" y1="182" x2="116" y2="236" />
              <rect className="boy__sock" x="77" y="230" width="15" height="11" rx="4" />
              <rect className="boy__sock" x="108" y="230" width="15" height="11" rx="4" />
              <rect className="boy__shoe" x="70" y="240" width="27" height="14" rx="7" />
              <rect className="boy__shoe" x="103" y="240" width="27" height="14" rx="7" />

              {/* shorts + shirt + neck + sleeves */}
              <path
                className="boy__shorts"
                d="M70 160 H130 V184 Q130 195 119 195 H109 L100 180 L91 195 H81 Q70 195 70 184 Z"
              />
              <path className="boy__shirt" d="M72 114 C72 101 84 95 100 95 C116 95 128 101 128 114 V168 H72 Z" />
              <rect className="boy__skin" x="93" y="86" width="14" height="12" rx="5" />
              <circle className="boy__sleeve" cx="74" cy="117" r="11" />
              <circle className="boy__sleeve" cx="126" cy="117" r="11" />

              {/* resting arm */}
              <g className="boy__arm-enter boy__arm-enter--rest">
                <path className="boy__limb" d="M74 122 Q62 142 62 164" />
                <circle className="boy__hand" cx="61" cy="170" r="8" />
              </g>

              {/* head */}
              <g className="boy__head-enter">
                <g className="boy__head">
                  <circle className="boy__skin" cx="100" cy="58" r="36" />
                  <circle className="boy__skin" cx="64" cy="62" r="6" />
                  <circle className="boy__skin" cx="136" cy="62" r="6" />
                  <path
                    className="boy__hair"
                    d="M64 58 C64 24 80 14 100 14 C120 14 136 24 136 58 C132 50 126 52 122 46 C114 54 96 54 84 46 C78 52 70 50 64 58 Z"
                  />
                  <circle className="boy__cheek" cx="78" cy="70" r="5" />
                  <circle className="boy__cheek" cx="122" cy="70" r="5" />
                  <path className="boy__brow" d="M79 49 Q86 45 93 49" />
                  <path className="boy__brow" d="M107 49 Q114 45 121 49" />
                  <g className={`boy__eye ${blinking ? "is-blinking" : ""}`.trim()}>
                    <ellipse className="boy__eye-white" cx="86" cy="60" rx="6.5" ry="7.5" />
                    <circle className="boy__pupil" cx="86" cy="60" r="3.2" />
                    <circle className="boy__spark-dot" cx="87.2" cy="58.5" r="1.1" />
                  </g>
                  <g className={`boy__eye ${blinking ? "is-blinking" : ""}`.trim()}>
                    <ellipse className="boy__eye-white" cx="114" cy="60" rx="6.5" ry="7.5" />
                    <circle className="boy__pupil" cx="114" cy="60" r="3.2" />
                    <circle className="boy__spark-dot" cx="115.2" cy="58.5" r="1.1" />
                  </g>
                  <path className="boy__nose" d="M100 63 q-2 4 0 6" />
                  <ellipse className="boy__mouth" cx="100" cy="76" rx="8" ry="3.4" />
                </g>
              </g>

              {/* waving arm (front) */}
              <g className="boy__arm-enter boy__arm-enter--wave">
                <g className="boy__arm-wave">
                  <path className="boy__limb" d="M126 122 Q146 116 150 92" />
                  <circle className="boy__hand" cx="151" cy="87" r="9" />
                </g>
              </g>
            </g>
          </g>

          {/* sound bars beside the head */}
          <g className="boy__waves">
            <rect className="boy__bar" x="150" y="52" width="5" height="20" rx="2.5" />
            <rect className="boy__bar" x="161" y="44" width="5" height="36" rx="2.5" />
            <rect className="boy__bar" x="172" y="54" width="5" height="16" rx="2.5" />
            <rect className="boy__bar" x="183" y="48" width="5" height="28" rx="2.5" />
          </g>

          {/* entrance sparkle burst */}
          <g className="boy__sparkles">
            <g transform="translate(58 28)">
              <path className="boy__spark" d="M0 -7 C0.8 -2.4 2.4 -0.8 7 0 C2.4 0.8 0.8 2.4 0 7 C-0.8 2.4 -2.4 0.8 -7 0 C-2.4 -0.8 -0.8 -2.4 0 -7 Z" />
            </g>
            <g transform="translate(142 24)">
              <path className="boy__spark" d="M0 -7 C0.8 -2.4 2.4 -0.8 7 0 C2.4 0.8 0.8 2.4 0 7 C-0.8 2.4 -2.4 0.8 -7 0 C-2.4 -0.8 -0.8 -2.4 0 -7 Z" />
            </g>
            <g transform="translate(40 148)">
              <path className="boy__spark" d="M0 -7 C0.8 -2.4 2.4 -0.8 7 0 C2.4 0.8 0.8 2.4 0 7 C-0.8 2.4 -2.4 0.8 -7 0 C-2.4 -0.8 -0.8 -2.4 0 -7 Z" />
            </g>
            <g transform="translate(162 130)">
              <path className="boy__spark" d="M0 -7 C0.8 -2.4 2.4 -0.8 7 0 C2.4 0.8 0.8 2.4 0 7 C-0.8 2.4 -2.4 0.8 -7 0 C-2.4 -0.8 -0.8 -2.4 0 -7 Z" />
            </g>
            <g transform="translate(176 72)">
              <path className="boy__spark" d="M0 -7 C0.8 -2.4 2.4 -0.8 7 0 C2.4 0.8 0.8 2.4 0 7 C-0.8 2.4 -2.4 0.8 -7 0 C-2.4 -0.8 -0.8 -2.4 0 -7 Z" />
            </g>
            <g transform="translate(108 250)">
              <path className="boy__spark" d="M0 -7 C0.8 -2.4 2.4 -0.8 7 0 C2.4 0.8 0.8 2.4 0 7 C-0.8 2.4 -2.4 0.8 -7 0 C-2.4 -0.8 -0.8 -2.4 0 -7 Z" />
            </g>
          </g>
        </svg>
      </div>

      {supported ? (
        <div className="avatar__controls">
          <button
            type="button"
            className="btn btn--soft btn--sm"
            onClick={toggle}
            aria-label={speaking ? "Stop the voice introduction" : "Play the voice introduction"}
          >
            <span className="btn__label">
              {speaking ? <StopIcon width={15} height={15} /> : <PlayIcon width={15} height={15} />}
              {actionLabel}
            </span>
          </button>
          <span className={`avatar__hint ${needsGesture ? "is-visible" : ""}`.trim()}>
            Tap to hear the intro
          </span>
        </div>
      ) : (
        <p className="avatar__na">Voice intro isn't supported in this browser.</p>
      )}
    </figure>
  );
}
