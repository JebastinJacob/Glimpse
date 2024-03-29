export const formatDate = (date: Date): string => {
  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
  const day = date.getDate().toString().padStart(2, '0');

  // Combine year, month, and day with dashes to form the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
