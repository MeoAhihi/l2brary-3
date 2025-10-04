import { format } from "date-fns";

export const DATE_FNS_YYYY_MM_DD_FORMAT = "yyyy-MM-dd";
export const DATE_FNS_DD_MM_YYYY_FORMAT = "dd/MM/yyyy";

export const formatDateToYMD = (
  dateString: string | undefined,
): string | undefined => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  return format(date, DATE_FNS_YYYY_MM_DD_FORMAT);
};
