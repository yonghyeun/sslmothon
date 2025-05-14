export const calculateZCoordinate = (
  r1: number,
  r2: number,
  h: number
): number => {
  const numerator = r1 ** 2 + 2 * r1 * r2 + 3 * r2 ** 2;
  const denominator = r1 ** 2 + r1 * r2 + r2 ** 2;

  if (denominator === 0) {
    throw new Error(
      "Denominator is zero. Please check the values of r1 and r2."
    );
  }
  return (h / 4) * (numerator / denominator);
};

