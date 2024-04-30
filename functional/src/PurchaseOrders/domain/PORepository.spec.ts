import { createPONumber } from "./PONumber";
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
  describe("fetchNextPONumber", () => {
    it("does it", async () => {
      const repo = constructPORepository();
      const res1 = await repo.fetchNextPONumber();
      expect(res1.unwrap()).toBe("syn-000001");
      await repo.save(
        createPurchaseOrder({ lineItems, poNumber: createPONumber(1) }),
      );
      const res2 = await repo.fetchNextPONumber();
      expect(res2.unwrap()).toBe("syn-000002");
    });
  });
});
