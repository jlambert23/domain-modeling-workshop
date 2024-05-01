import { PONumber, createPONumber, parsePONumber } from "./PONumber";

describe("PONumber value object", () => {
  describe("createPONumber", () => {
    it("does it", () => {
      const poNumber = createPONumber("syn", 115);
      expect(poNumber).toBe("syn-000115");
    });
  });
  describe("parsePONumber", () => {
    it("does it", () => {
      const poNumber = createPONumber("syn", 115);
      const { prefix, num } = parsePONumber(poNumber)!;
      expect(prefix).toBe("syn");
      expect(num).toBe(115);
    });
    it("returns null when not given a PONumber", () => {
      expect(parsePONumber("not a po number" as PONumber)).toBeNull();
      expect(parsePONumber("syn-foo" as PONumber)).toBeNull();
      expect(parsePONumber("000115" as PONumber)).toBeNull();
      expect(parsePONumber("-000115" as PONumber)).toBeNull();
      expect(parsePONumber("syn-0" as PONumber)).toBeNull();
      expect(parsePONumber(12345 as unknown as PONumber)).toBeNull();
    });
  });
});
