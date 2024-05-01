import { Err } from "oxide.ts";
import { IPORepository } from "../domain/IPORepository";
import { LineItem, createPurchaseOrder } from "../domain/PurchaseOrder";

export const createPO =
  ({ PORepo }: { PORepo: IPORepository }) =>
  async (lineItems: LineItem[]) => {
    const poNumberResult = await PORepo.fetchNextPONumber();
    if (poNumberResult.isErr()) return Err(poNumberResult.unwrapErr());
    const poNumber = poNumberResult.unwrap();
    const purchaseOrder = createPurchaseOrder({ lineItems, poNumber });
    const res = await PORepo.save(purchaseOrder);
    return res.map(() => purchaseOrder.id);
  };
