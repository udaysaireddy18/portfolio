import { useCallback, useEffect, useRef, useState } from "react";

/** Voices that tend to sound gentle, bright and youthful — a "sweet" read. */
const SWEET_HINTS = [
  "samantha",
  "aria",
  "jenny",
  "zira",
  "ava",
  "allison",
  "serena",
  "karen",
  "moira",
  "tessa",
  "susan",
  "victoria",
  "female",
  "google us english",
  "google uk english female",
  "microsoft aria",
  "microsoft jenny",
  "microsoft zira",
  "neerja",
  "heera",
];

/**
 * Speaks a line of text with the system's speech synthesis, preferring a
 * sweet, youthfully-pitched English voice. Exposes `speaking` so the UI
 * (and the character) can react. Cancel-on-unmount so navigation never
 * leaves a voice running.
 */
export function useNarration(text: string, onStart?: () => void) {
  const [supported] = useState(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
  );
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const onStartRef = useRef(onStart);

  useEffect(() => {
    onStartRef.current = onStart;
  });

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    const pickVoice = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;
      const english = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
      const pool = english.length ? english : voices;
      const sweet = pool.find((voice) =>
        SWEET_HINTS.some((hint) => voice.name.toLowerCase().includes(hint)),
      );
      voiceRef.current = sweet ?? pool[0] ?? null;
    };

    pickVoice();
    synth.addEventListener("voiceschanged", pickVoice);
    return () => synth.removeEventListener("voiceschanged", pickVoice);
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const start = useCallback(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.lang = voiceRef.current?.lang || "en-US";
    utterance.rate = 0.98;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
      onStartRef.current?.();
    };
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    synth.speak(utterance);
  }, [supported, text]);

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  return { supported, speaking, start, stop };
}
