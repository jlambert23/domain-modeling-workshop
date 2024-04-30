import { createPONumber } from "./PONumber";

describe("PONumber value object", () => {
  describe("createPONumber", () => {
    it("does it", () => {
      const poNumber = createPONumber(115);
      expect(poNumber).toBe("syn-000115");
    });
  });
});
