/**
 * Форматирует минуты.
 * @param {number} minutes
 * @return {string}
 */
export const getTime = (minutes: number): string => {
  const m = minutes % 60;
  const h = (minutes - m) / 60;
  return h > 0 ? `${h}ч ${m}м` : `${m}м`;
};
