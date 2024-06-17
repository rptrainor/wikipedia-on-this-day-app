import { getOrdinalSuffix, getMonthName } from '../utils';

jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn((...classes) => classes.join(' ')),
}));

jest.mock('clsx', () => jest.fn((...classes) => classes.join(' ')));

describe('utils', () => {

  describe('getOrdinalSuffix', () => {
    it('should return the correct ordinal suffix for the day', () => {
      expect(getOrdinalSuffix(1)).toBe('1st');
      expect(getOrdinalSuffix(2)).toBe('2nd');
      expect(getOrdinalSuffix(3)).toBe('3rd');
      expect(getOrdinalSuffix(4)).toBe('4th');
      expect(getOrdinalSuffix(11)).toBe('11th');
      expect(getOrdinalSuffix(12)).toBe('12th');
      expect(getOrdinalSuffix(13)).toBe('13th');
      expect(getOrdinalSuffix(21)).toBe('21st');
      expect(getOrdinalSuffix(22)).toBe('22nd');
      expect(getOrdinalSuffix(23)).toBe('23rd');
      expect(getOrdinalSuffix(101)).toBe('101st');
    });
  });

  describe('getMonthName', () => {
    it('should return the correct month name for a valid month number', () => {
      expect(getMonthName(1)).toBe('January');
      expect(getMonthName(2)).toBe('February');
      expect(getMonthName(3)).toBe('March');
      expect(getMonthName(4)).toBe('April');
      expect(getMonthName(5)).toBe('May');
      expect(getMonthName(6)).toBe('June');
      expect(getMonthName(7)).toBe('July');
      expect(getMonthName(8)).toBe('August');
      expect(getMonthName(9)).toBe('September');
      expect(getMonthName(10)).toBe('October');
      expect(getMonthName(11)).toBe('November');
      expect(getMonthName(12)).toBe('December');
    });

    it('should return null for an invalid month number', () => {
      expect(getMonthName(0)).toBeNull();
      expect(getMonthName(13)).toBeNull();
    });
  });
});
