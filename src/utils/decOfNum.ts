/**
 * Возвращает форму склонения для числа
 * http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
 * @param {{one: string, two: string, few: string}} wordForms
 * @param {number} num
 * @return {string}
 */
export const decOfNum = (wordForms: {
  one: string
  two: string
  few: string
}, num: number): string => {
  const forms = [
    wordForms.one,
    wordForms.two,
    wordForms.few
  ];
  if (num % 10 === 1 && num % 100 !== 11) {
    return forms[0];
  } else {
    if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
      return forms[1];
    } else {
      return forms[2];
    }
  }
};


