export const checkEmptyInputs = (data: string[]) => {
  const result = data.some((input) => input === '');
  if (result) return true;
  if (!result) return false;
};
