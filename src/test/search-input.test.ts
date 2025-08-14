import '../components/search-input';
import { SearchInput } from '../components/search-input';

describe('SearchInput Web input', () => {
  let input: SearchInput & { fetchUser: jest.Mock };

  beforeEach(() => {
    jest.useFakeTimers();
    input = document.createElement('input', {
      is: 'search-input',
    }) as SearchInput & { fetchUser: jest.Mock };
    document.body.appendChild(input);

    global.fetch = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('fetch sin valores', () => {
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    jest.advanceTimersByTime(1000);

    expect(fetch).not.toHaveBeenCalled();
  });
});
