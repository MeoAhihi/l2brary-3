import { format } from "date-fns";

export const DATE_FNS_YYYY_MM_DD_FORMAT = "yyyy-MM-dd";
export const DATE_FNS_DD_MM_YYYY_FORMAT = "dd/MM/yyyy";
export const DATE_FNS_YYYY_MM_DD_HH_MM_FORMAT = "yyyy-MM-dd HH:mm";

export const formatDateToYMD = (
  dateString: string | undefined,
): string | undefined => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  return format(date, DATE_FNS_YYYY_MM_DD_FORMAT);
};

export const formatDateTimeToYMDHM = (
  dateString: string | Date | undefined,
): string | undefined => {
  if (!dateString) return undefined;

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return format(date, DATE_FNS_YYYY_MM_DD_HH_MM_FORMAT);
};
