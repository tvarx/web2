import { ReactNode } from "react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
  glowColor?: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  mockupType: "workout" | "tracking" | "analytics";
  badgeText: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  numericValue: number;
}
