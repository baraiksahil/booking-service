/**
 * Converts "09:30" string to minutes (e.g., 570)
 * @param {string} time - Time in "HH:MM" format
 * @returns {number} - Total minutes from midnight
 */

export const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Converts minutes (e.g., 570) back to "09:30" string
 * @param {number} minutes - Total minutes from midnight
 * @returns {string} - Time in "HH:MM" format
 */
export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};
