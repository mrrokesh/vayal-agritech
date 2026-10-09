// Small input helpers shared by the POST routes.
export const str = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export const phone10 = (v) => {
  const digits = String(v ?? '').replace(/\D/g, '');
  return digits.length === 10 ? digits : null;
};
export const posNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};
