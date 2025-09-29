export const getNumericParam = (
  value: string | string[] | undefined,
  fallback: number,
) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
