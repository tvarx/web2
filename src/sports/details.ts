import { useState, useEffect } from "react";
import type { ExerciseDetails } from "./types";

/**
 * Lazily-loaded registry of heavy exercise rich text (description, steps,
 * extra). The generated payload ships in its own chunk and is only fetched on
 * the exercise page — on the server (prerender) it is injected synchronously
 * via setExerciseDetails before rendering.
 */
let registry: Record<string, ExerciseDetails> | null = null;

export function setExerciseDetails(data: Record<string, ExerciseDetails> | null): void {
  registry = data;
}

export function getExerciseDetails(id: string): ExerciseDetails | undefined {
  return registry?.[id];
}

export function ensureExerciseDetails(): Promise<void> {
  if (registry !== null) return Promise.resolve();
  return import("../generated/exercises-details").then((m) => {
    setExerciseDetails(m.default as Record<string, ExerciseDetails>);
  });
}

export function useExerciseDetails(id: string): ExerciseDetails | undefined {
  const [, setTick] = useState(0);
  useEffect(() => {
    let active = true;
    if (getExerciseDetails(id) !== undefined) return;
    ensureExerciseDetails().then(() => {
      if (active) setTick((n) => n + 1);
    });
    return () => {
      active = false;
    };
  }, [id]);
  return getExerciseDetails(id);
}