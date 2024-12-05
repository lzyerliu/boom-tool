import { searchParams } from '../index'

describe('searchParams', () => {
  test('should return an object with null for specified keys when search is empty', () => {
    const result = searchParams('', 'key1', 'key2');
    expect(result).toEqual({ key1: null, key2: null });
  });

  
  test('should return an object with null for specified keys when search does not contain any specified keys', () => {
    const result = searchParams('query1=value1&query2=value2', 'key1', 'key2');
    expect(result).toEqual({ key1: null, key2: null });
  });

  test('should return an object with null for specified keys when search does not contain any specified keys', () => {
    const result = searchParams('query1=value1&query2=value2', 'query1', 'query1');
    expect(result).toEqual({ query1: 'value1', query2: 'value2' });
  });
})
