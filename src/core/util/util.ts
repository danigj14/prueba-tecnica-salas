export function isNumberInput(input: string) {
  return /^[0-9]*$/.test(input);
}

export function isValidPercentInput(input: string) {
  return (
    !input ||
    (isNumberInput(input) &&
      Number.parseInt(input) >= 0 &&
      Number.parseInt(input) <= 100)
  );
}
