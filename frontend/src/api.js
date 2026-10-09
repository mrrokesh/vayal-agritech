const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function api(path, { body, ...opts } = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    ...opts,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
