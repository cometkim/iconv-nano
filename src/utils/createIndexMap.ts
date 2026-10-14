const createIndexMap = <T extends PropertyKey>(
  values: T[],
): Record<T, number> => {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- The return type will be correct in runtime
  const output = {} as Record<T, number>;
  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    if (value !== undefined) {
      output[value] = index;
    }
  }
  return output;
};

export { createIndexMap };
