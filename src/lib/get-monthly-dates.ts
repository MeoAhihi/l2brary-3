/**
 * Get all monthly dates between start and end that fall on the same day-of-month.
 * If the month doesn't have that day (e.g., Feb 30), it skips it.
 *
 * @param start - Start date (string or Date)
 * @param end - End date (string or Date)
 * @param dayOfMonth - Day of the month (1–31)
 * @returns Array of Date objects
 */
export function getMonthlyDates(
  start: string | Date,
  end: string | Date,
  dayOfMonth?: number,
): Date[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates: Date[] = [];

  // Default to the same day as the start date
  const targetDay = dayOfMonth ?? startDate.getDate();

  const current = new Date(startDate);
  current.setDate(targetDay);

  // Adjust the first occurrence if before the start
  if (current < startDate) {
    current.setMonth(current.getMonth() + 1);
  }

  // Loop through months
  while (current <= endDate) {
    // Only push valid days (skip e.g. Feb 30)
    if (current.getDate() === targetDay) {
      dates.push(new Date(current));
    }

    // Move to next month
    current.setMonth(current.getMonth() + 1);
    current.setDate(targetDay);
  }

  return dates;
}
