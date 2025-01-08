export const calculateTotalPages = (
  totalResults: number,
  resultsPerPage: number = 10
): number => {
  return Math.ceil(totalResults / resultsPerPage);
};
