import { isUuid } from "../../utilities/uuid";
import { createPONumber } from "./PONumber";
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

describe("Purcase Order Entity", () => {
  it("does it", () => {
    const PO = createPurchaseOrder({
      lineItems,
      poNumber: createPONumber("syn", 52),
    });
    expect(isUuid(PO.id)).toBeTruthy();
    expect(PO.poNumber).toBe("syn-000052");
  });
});
