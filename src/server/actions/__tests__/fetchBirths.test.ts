import { fetchBirths } from '../fetchBirths';
import { type WikipediaApiBirthTypeResponse } from '~/types/BirthdayTypes';

global.fetch = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: Function) => fn,
}));

describe('fetchBirths', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and sorts the data correctly', async () => {
    const mockResponse = {
      births: [
        { year: 2000, text: 'Person born in 2000', pages: [] },
        { year: 1990, text: 'Person born in 1990', pages: [] },
        { year: 1980, text: 'Person born in 1980', pages: [] },
      ]
    } as WikipediaApiBirthTypeResponse;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchBirths({ MM: '01', DD: '01' });

    expect(result).toEqual({
      births: [
        { year: 1980, text: 'Person born in 1980', pages: [] },
        { year: 1990, text: 'Person born in 1990', pages: [] },
        { year: 2000, text: 'Person born in 2000', pages: [] },
      ]
    });
  });

  it('handles a network error', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await fetchBirths({ MM: '01', DD: '01' });

    expect(result).toEqual(new Error('Network response was not ok'));
  });
});

