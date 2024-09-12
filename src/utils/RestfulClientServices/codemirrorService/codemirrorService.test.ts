import { describe, it, expect } from 'vitest';
import { replaceVariablesForLinting } from './codemirrorService';

describe('replaceVariablesForLinting', () => {
  const variables = [
    { key: 'name', value: 'John' },
    { key: 'id', value: '123' },
  ];

  test('should replace variables with placeholders', () => {
    const content = '{"name": "{{name}}", "id": "{{id}}"}';
    const variables = [
      { key: 'name', value: 'test_name' },
      { key: 'id', value: 'test_id' },
    ];

    const expectedContent =
      '{"name": ""name_placeholder"", "id": ""id_placeholder""}';

    const result = replaceVariablesForLinting(content, variables);
    expect(result).toBe(expectedContent);
  });

  it('should handle content without variables', () => {
    const content = '{"name": "someName", "id": "someId"}';
    const result = replaceVariablesForLinting(content, variables);
    expect(result).toBe(content);
  });
});
