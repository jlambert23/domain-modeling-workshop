export type PONumber = `syn-${number}`;

export const createPONumber = (num: number): PONumber => {
  const paddedNumber = String(num).padStart(6, "0");
  return `syn-${paddedNumber}` as PONumber;
};

export const parsePONumber = (poNumber: PONumber): number | null => {
  const match = poNumber.match(/\d+/);
  if (!match) return null;
  const parsedNumber = Number(match[0]);
  return Number.isInteger(parsedNumber) ? parsedNumber : null;
};
