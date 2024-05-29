const poRegex = /^(\w+)-([0-9]{6})$/i;

export type PONumber = `${string}-${number}`;

export const PONumber = {
  create: (prefix: string, num: number): PONumber => {
    const paddedNumber = String(num).padStart(6, "0");
    return `${prefix}-${paddedNumber}` as PONumber;
  },

  prefix: (num: PONumber): string => num.match(poRegex)?.[1]!,

  value: (num: PONumber): number => Number(num.match(poRegex)?.[2]),
};
