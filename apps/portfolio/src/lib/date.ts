export function isoDate(input: Date | string | number): string {
  const date =
    input instanceof Date
      ? input
      : typeof input === 'string' || typeof input === 'number'
        ? new Date(input)
        : new Date(String(input));

  if (Number.isNaN(date.getTime())) {
    throw new Error(`isoDate: invalid date input "${String(input)}"`);
  }

  return date.toISOString();
}
