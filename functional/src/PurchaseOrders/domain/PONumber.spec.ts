import { PONumber } from "./PONumber";

describe("PONumber.create", () => {
  it("creates a PO number", () => {
    const poNumber = PONumber.create("syn", 115);
    expect(poNumber).toBe("syn-000115");
  });
});

describe("PONumber.prefix", () => {
  it("returns the PO number prefix", () => {
    const poNumber = PONumber.create("syn", 115);
    expect(PONumber.prefix(poNumber)).toBe("syn");
  });
});

describe("PONumber.value", () => {
  it("returns the PO number value", () => {
    const poNumber = PONumber.create("syn", 115);
    expect(PONumber.value(poNumber)).toBe(115);
  });
});
