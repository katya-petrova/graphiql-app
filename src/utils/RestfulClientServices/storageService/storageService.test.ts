import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getFromLocalStorage, saveToLocalStorage } from './storageService';

describe('localStorage utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    } as unknown as Storage;
  });

  describe('saveToLocalStorage', () => {
    it('should save the given value to localStorage', () => {
      const key = 'testKey';
      const value = { name: 'John', age: 30 };

      saveToLocalStorage(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(value)
      );
    });
  });

  describe('getFromLocalStorage', () => {
    it('should return parsed value from localStorage if it exists', () => {
      const key = 'testKey';
      const storedValue = JSON.stringify({ name: 'John', age: 30 });

      localStorage.getItem = vi.fn(() => storedValue);

      const result = getFromLocalStorage(key);
      expect(result).toEqual({ name: 'John', age: 30 });
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('should return default value if localStorage item does not exist', () => {
      const key = 'testKey';
      const defaultValue = [{ id: 1, name: 'defaultItem' }];

      localStorage.getItem = vi.fn(() => null);

      const result = getFromLocalStorage(key, defaultValue);
      expect(result).toEqual(defaultValue);
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('should return an empty array as the default value when no value is found and no default is provided', () => {
      const key = 'nonexistentKey';
      localStorage.getItem = vi.fn(() => null);

      const result = getFromLocalStorage(key);
      expect(result).toEqual([]);
    });
  });
});
