export function formatDate(
  dateStr?: string,
  options?: Intl.DateTimeFormatOptions,
) {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  // check if valid date
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(
    "en-IN",
    options
      ? options
      : {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
  );
}
