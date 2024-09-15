import { linter, Diagnostic } from '@codemirror/lint';

export const replaceVariablesForLinting = (
  content: string,
  variables: { key: string; value: string }[]
): string => {
  let lintingContent = content;
  variables.forEach(({ key }) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    lintingContent = lintingContent.replace(regex, `"${key}_placeholder"`);
  });
  return lintingContent;
};

export const jsonLinter = (variables: { key: string; value: string }[]) => {
  return linter((view) => {
    const results: Diagnostic[] = [];
    const content = view.state.doc.toString();
    const lintingContent = replaceVariablesForLinting(content, variables);

    if (lintingContent.trim() === '') {
      return results;
    }

    try {
      JSON.parse(lintingContent);
    } catch {
      results.push({
        from: 0,
        to: view.state.doc.length,
        message: 'Invalid JSON',
        severity: 'error',
      });
    }

    return results;
  });
};
