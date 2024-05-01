import { PONumber, createPONumber, parsePONumber } from "./PONumber";

describe("PONumber value object", () => {
  describe("createPONumber", () => {
    it("does it", () => {
      const poNumber = createPONumber(115);
      expect(poNumber).toBe("syn-000115");
    });
  });
  describe("parsePONumber", () => {
    it("does it", () => {
      const poNumber = createPONumber(115);
      const num = parsePONumber(poNumber);
      expect(num).toBe(115);
    });
    it("returns null when it fails", () => {
      const num = parsePONumber("not a po number" as PONumber);
      expect(num).toBeNull();
    });
  });
});
