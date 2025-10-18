/**
 * Get all dates between start and end that fall on a specific weekday.
 *
 * @param start - Start date (string or Date)
 * @param end - End date (string or Date)
 * @param day - Desired weekday (0 = Sunday, 1 = Monday, ... 6 = Saturday)
 * @returns Array of Date objects
 */
export function getWeeklyDates(
  start: string | Date,
  end: string | Date,
  day: number,
): Date[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates: Date[] = [];

  // Find the first occurrence of the target day
  const first = new Date(startDate);
  first.setDate(startDate.getDate() + ((day - startDate.getDay() + 7) % 7));

  // Loop weekly until we pass the end date
  for (let d = new Date(first); d <= endDate; d.setDate(d.getDate() + 7)) {
    dates.push(new Date(d));
  }

  return dates;
}
