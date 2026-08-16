function readProcessEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }
  return undefined;
}

function readViteEnv(key: string): string | undefined {
  if (typeof import.meta !== "undefined" && (import.meta as { env?: Record<string, string> }).env) {
    return (import.meta as { env: Record<string, string> }).env[key];
  }
  return undefined;
}

/** Public API base for sports content. */
export const SPORTS_API_BASE: string =
  readProcessEnv("SPORTS_API_BASE") || readViteEnv("VITE_SPORTS_API_BASE") || "https://api.tvarx.com";

/** The site's own canonical domain (no trailing slash). */
export const SITE_BASE_URL: string =
  readProcessEnv("SITE_BASE_URL") || readViteEnv("VITE_SITE_BASE_URL") || "https://tvarx.com";

/** Host the API uses inside its own canonical/hreflang URLs, replaced by SITE_BASE_URL. */
export const API_DEFAULT_HOST: string = "https://fitara.chbk.app";