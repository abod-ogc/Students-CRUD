export function clampGpa(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.min(4, Math.max(0, Math.round(n * 10) / 10));
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}