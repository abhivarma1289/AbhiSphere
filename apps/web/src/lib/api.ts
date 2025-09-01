const BASE = import.meta.env.VITE_API_URL as string;

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) {
    throw new Error(
      "VITE_API_URL is missing. Create apps/web/.env and restart Vite."
    );
  }
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  if (!ct.includes("application/json")) {
    throw new Error(
      `Expected JSON but got "${ct}". Check VITE_API_URL. First 120 chars: ${text.slice(
        0,
        120
      )}`
    );
  }
  return JSON.parse(text) as T;
}
