import { fetchBirths } from '~/server/actions/fetchBirths';
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

  it('handles an empty response', async () => {
    const mockResponse = {
      births: []
    } as WikipediaApiBirthTypeResponse;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchBirths({ MM: '01', DD: '01' });

    expect(result).toEqual({ births: [] });
  });

  it('handles unexpected data format', async () => {
    const mockResponse = {
      births: []
    } as WikipediaApiBirthTypeResponse;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchBirths({ MM: '01', DD: '01' });

    expect(result).toEqual({ births: [] });
  });

  it('handles invalid date format', async () => {
    const result = await fetchBirths({ MM: '13', DD: '40' });

    expect(result).toEqual({ births: [] });
  });

  it('handles authorization failure', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    const result = await fetchBirths({ MM: '01', DD: '01' });

    expect(result).toEqual(new Error('Network response was not ok'));
  });

  it('handles response timeout', async () => {
    jest.useFakeTimers();
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({ births: [] }) }), 10000))
    );

    const fetchPromise = fetchBirths({ MM: '01', DD: '01' });

    jest.runAllTimers();

    const result = await fetchPromise;

    expect(result).toEqual({ births: [] });

    jest.useRealTimers();
  });
});
