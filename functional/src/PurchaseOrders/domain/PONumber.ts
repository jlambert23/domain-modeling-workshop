export type PONumber = `syn-${number}`;

export const createPONumber = (num: number): PONumber => {
  const paddedNumber = String(num).padStart(6, "0");
  return `syn-${paddedNumber}` as PONumber;
};

