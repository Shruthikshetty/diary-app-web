import { Entries } from "@/app/page";

// function to return a filtered list of entires based on the search term by split and match , also take option favorite filter
export const filterEntries = (
  searchString: string,
  entries: Entries[],
  isFavoriteTab: boolean = false,
) => {
  const query = searchString?.trim().toLowerCase();

  // return in case of empty entries
  if (!entries?.length) return [];

  // split and get a list of matcher from search string
  const matchStrings = query ? query.split(/\s+/) : []; //\s — matches any whitespace character , + — means "one or more" in a row.

  // filter
  return entries.filter((entry) => {
    // check fav if required
    if (isFavoriteTab && !entry.isFavorite) return false;
    if (matchStrings.length === 0) return true; // true if no matcher

    const title = entry.title?.toLowerCase() ?? "";
    return matchStrings.some((matcher) => title.includes(matcher));
  });
};
