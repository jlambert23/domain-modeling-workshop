import { match } from "oxide.ts";
import { PONumber, createPONumber } from "./PONumber";
import { constructPORepository } from "./PORepistory";
import { LineItem, createPurchaseOrder } from "./PurchaseOrder";

const lineItems: LineItem[] = [
  {
    item: 21412,
    description: "DVD Set",
    price: 50.0,
    quantity: 2,
  },
  {
    item: 478,
    description: "People's Magazine",
    price: 10.99,
    quantity: 1,
  },
];

describe("Purcase Order Repository", () => {
  describe("save", () => {
    it("returns an error when given a smaller PO number", async () => {
      const repo = constructPORepository();
      const po9 = createPurchaseOrder({
        lineItems,
        poNumber: createPONumber("syn", 9),
      });
      await repo.save(po9);
      const po1 = createPurchaseOrder({
        lineItems,
        poNumber: createPONumber("syn", 1),
      });
      const result = await repo.save(po1);
      const output = match(result, { Err: (err: Error) => err.message });
      expect(output).toEqual("PO number is invalid");
    });
    it("returns an error when given the same PO number", async () => {
      const repo = constructPORepository();
      const po1 = createPurchaseOrder({
        lineItems,
        poNumber: createPONumber("syn", 1),
      });
      await repo.save(po1);
      const po1Again = createPurchaseOrder({
        lineItems,
        poNumber: createPONumber("syn", 1),
      });
      const result = await repo.save(po1Again);
      const output = match(result, { Err: (err: Error) => err.message });
      expect(output).toEqual("PO number is invalid");
    });
    it("returns an error when given an invalid PO number", async () => {
      const repo = constructPORepository();
      const po1 = createPurchaseOrder({
        lineItems,
        poNumber: createPONumber("syn", 1),
      });
      await repo.save(po1);
      const poInvalid = createPurchaseOrder({
        lineItems,
        poNumber: "foobar" as PONumber,
      });
      const result = await repo.save(poInvalid);
      const output = match(result, { Err: (err: Error) => err.message });
      expect(output).toEqual("PO number is invalid");
    });
  });
  describe("fetchNextPONumber", () => {
    it("fetches next PONumber by org", async () => {
      const repo = constructPORepository();
      const syn1Res = await repo.fetchNextPONumber("syn");
      expect(syn1Res.unwrap()).toBe("syn-000001");
      await repo.save(
        createPurchaseOrder({ lineItems, poNumber: createPONumber("syn", 1) }),
      );
      const syn2Res = await repo.fetchNextPONumber("syn");
      expect(syn2Res.unwrap()).toBe("syn-000002");
      const fooRes = await repo.fetchNextPONumber("foo");
      expect(fooRes.unwrap()).toBe("foo-000001");
    });
  });
});
