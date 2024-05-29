import { isUuid } from "../../utilities/uuid";
import { PONumber } from "../domain/PONumber";
import { constructPORepository } from "../domain/PORepistory";
import { LineItem, createPurchaseOrder } from "../domain/PurchaseOrder";
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
    const result = await createPO({ PORepo: repo })({
      org: "syn",
      lineItems,
    });
    const id = result._unsafeUnwrap();
    expect(isUuid(id)).toBeTruthy();
  });

  it("saves a purchase order to a repository", async () => {
    const repo = constructPORepository();
    const result = await createPO({ PORepo: repo })({ org: "syn", lineItems });
    const id = result._unsafeUnwrap();
    const poRes = await repo.fetch(id);
    expect(poRes._unsafeUnwrap().id).toEqual(id);
  });

  it("fails to save a purchase order without line items", async () => {
    const repo = constructPORepository();
    const result = await createPO({ PORepo: repo })({
      org: "syn",
      lineItems: [],
    });
    expect(result._unsafeUnwrapErr()).toEqual(new Error("Missing line items"));
  });

  it("increments purchase order PO number by org", async () => {
    const repo = constructPORepository();
    const poSeed = createPurchaseOrder({
      lineItems,
      poNumber: PONumber.create("syn", 1),
    });
    await repo.save(poSeed);
    const synRes = await createPO({ PORepo: repo })({ org: "syn", lineItems });
    const synPORes = await repo.fetch(synRes._unsafeUnwrap());
    expect(synPORes._unsafeUnwrap().poNumber).toEqual(
      PONumber.create("syn", 2),
    );
    const fooRes = await createPO({ PORepo: repo })({ org: "foo", lineItems });
    const fooPORes = await repo.fetch(fooRes._unsafeUnwrap());
    expect(fooPORes._unsafeUnwrap().poNumber).toEqual(
      PONumber.create("foo", 1),
    );
  });
});
