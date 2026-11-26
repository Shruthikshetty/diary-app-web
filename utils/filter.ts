import { Entries } from "@/app/page";

// function to return a filtered list of entires based on the search term by split and match
export const filterEntries = (searchString: string, entries: Entries[]) => {
  const query = searchString?.trim().toLowerCase();

  // return in case of empty values
  if (!query || !entries?.length) return [];

  // split and get a list of matcher from search string
  const matchStrings = query.split(/\s+/); //\s — matches any whitespace character , + — means "one or more" in a row.

  // filter
  return entries.filter((entry) => {
    const title = entry.title?.toLowerCase() ?? "";
    return matchStrings.some((matcher) => title.includes(matcher));
  });
};
