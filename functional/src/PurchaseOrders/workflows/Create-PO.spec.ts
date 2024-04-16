import { match } from "oxide.ts";
import { isUuid } from "../../utilities/uuid";
import { constructPORepository } from "../domain/PORepistory";
import { LineItem, isPurchaseOrder } from "../domain/PurchaseOrder";
import { createPO } from "./Create-PO";

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

describe("Create PO Workflow", () => {
  it("is callable", () => {
    const repo = constructPORepository();
    createPO({ PORepo: repo });
  });

  it("returns a uuid", async () => {
    const repo = constructPORepository();
    const poResult = await createPO({ PORepo: repo })(lineItems);
    const id = poResult.unwrap();
    expect(poResult.isOk()).toBeTruthy();
    expect(isUuid(id)).toBeTruthy();
  });

  it("saves a purchase order to a repository", async () => {
    const repo = constructPORepository();
    const result = await createPO({ PORepo: repo })(lineItems);
    const id = result.unwrap();
    const poRes = await repo.fetch(id);
    const output = match(poRes, {
      Ok: {
        Some: (result) => result,
        None: () => "No results for that search.",
      },
      Err: (err) => `Error: ${err}.`,
    });

    expect(isPurchaseOrder(output)).toBeTruthy();
    if (isPurchaseOrder(output)) {
      expect(id).toEqual(output.id);
    }
  });

  it("fails to save a purchase order without line items", async () => {
    const repo = constructPORepository();
    const result = await createPO({ PORepo: repo })([]);
    expect(result.unwrapErr()).toEqual(new Error("Missing line items"));
  });
});
