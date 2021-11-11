/**
 *
 * @param queryObj
 * @returns
 */
export const encodeGetQuery = (queryObj: object) =>
  "?" +
  Object.entries(queryObj)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");
