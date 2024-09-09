export const replaceVariablesInBody = (
  body: string,
  variables: { key: string; value: string }[]
): string => {
  let updatedBody = body;
  variables.forEach(({ key, value }) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    updatedBody = updatedBody.replace(regex, value);
  });
  return updatedBody;
};
