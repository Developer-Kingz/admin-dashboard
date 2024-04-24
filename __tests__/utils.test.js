import { abbreviateName, formatDate, apiCall } from "../src/utils";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('abbreviateName', () => {
    test('abbreviates first and last names by using only their first letters', () => {
      expect(abbreviateName('John Doe')).toBe('JD');

      expect(abbreviateName('A B')).toBe('AB');

      expect(abbreviateName('Alice C')).toBe('AC');
  
      expect(abbreviateName('D Erika')).toBe('DE');
    });
});

describe('formatDate', () => {
    test('converts date string "3-3-2023" to "March 3, 2023"', () => {
      const inputDate = '3-3-2023';
      const expectedOutput = 'March 3, 2023';
      expect(formatDate(inputDate)).toBe(expectedOutput);
    });
});

describe('apiCall', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test('makes a successful API call', async () => {
    const responseData = { id: 1, name: 'John Doe' };
    mock.onAny().reply(200, responseData);

    const requestConfig = {
      url: '/api/users',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await apiCall(requestConfig);
    expect(response.data).toEqual(responseData);
  });

  test('handles API call error', async () => {
    const errorMessage = 'Network Error';
    mock.onAny().networkError();

    const requestConfig = {
      url: '/api/users',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await apiCall(requestConfig);

    expect(response).toEqual(errorMessage);
  });
});
