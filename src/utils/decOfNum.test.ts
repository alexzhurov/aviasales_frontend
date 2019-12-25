import { decOfNum } from './decOfNum';

test('test word form', () => {
  const forms = {
    one: 'пересадка',
    two: 'пересадки',
    few: 'пересадок'
  };

  expect(decOfNum(forms, 1)).toBe(forms.one);
  expect(decOfNum(forms, 2)).toBe(forms.two);
  expect(decOfNum(forms, 3)).toBe(forms.two);
  expect(decOfNum(forms, 4)).toBe(forms.two);
  expect(decOfNum(forms, 10)).toBe(forms.few);
  expect(decOfNum(forms, 45)).toBe(forms.few);
  expect(decOfNum(forms, 99)).toBe(forms.few);
  expect(decOfNum(forms, 2304)).toBe(forms.two);
  expect(decOfNum(forms, 70)).toBe(forms.few);
});
