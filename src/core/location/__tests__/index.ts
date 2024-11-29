import { searchParams } from '../index'

describe('searchParams', () => {
  test('should return an object with null for specified keys when search is empty', () => {
    const result = searchParams('', 'key1', 'key2');
    expect(result).toEqual({ key1: null, key2: null });
  });
})
