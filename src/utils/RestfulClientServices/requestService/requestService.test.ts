import { describe, it, expect } from 'vitest';
import { replaceVariablesInBody } from './requestService';

describe('replaceVariablesInBody', () => {
  it('should replace variables in the body with corresponding values', () => {
    const body = 'Hello, {{name}}! Welcome to {{place}}.';
    const variables = [
      { key: 'name', value: 'John' },
      { key: 'place', value: 'New York' },
    ];

    const result = replaceVariablesInBody(body, variables);
    expect(result).toBe('Hello, John! Welcome to New York.');
  });

  it('should leave the body unchanged if no variables are found', () => {
    const body = 'Hello, {{name}}!';
    const variables = [{ key: 'place', value: 'New York' }];

    const result = replaceVariablesInBody(body, variables);
    expect(result).toBe('Hello, {{name}}!');
  });

  it('should return the original body if the variables array is empty', () => {
    const body = 'Hello, {{name}}!';
    const variables: { key: string; value: string }[] = [];

    const result = replaceVariablesInBody(body, variables);
    expect(result).toBe(body);
  });

  it('should return the original body if the body is an empty string', () => {
    const body = '';
    const variables = [{ key: 'name', value: 'John' }];

    const result = replaceVariablesInBody(body, variables);
    expect(result).toBe('');
  });

  it('should handle multiple occurrences of the same variable', () => {
    const body = 'Hello, {{name}}! Goodbye, {{name}}!';
    const variables = [{ key: 'name', value: 'John' }];

    const result = replaceVariablesInBody(body, variables);
    expect(result).toBe('Hello, John! Goodbye, John!');
  });

  it('should handle cases where variable keys include special regex characters', () => {
    const body = 'This is {{var1}} and {{var.2}}.';
    const variables = [
      { key: 'var1', value: 'one' },
      { key: 'var.2', value: 'two' },
    ];

    const result = replaceVariablesInBody(body, variables);
    expect(result).toBe('This is one and two.');
  });
});
