export function formattedAppraisalDate(dateString: string): string {
  const date = new Date(dateString);

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Return the formatted date
  return `${year}/${month}/${day}`;
}
