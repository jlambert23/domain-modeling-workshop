import { IPORepository } from "../domain/IPORepository";
import { LineItem, createPurchaseOrder } from "../domain/PurchaseOrder";

export const createPO =
  ({ PORepo }: { PORepo: IPORepository }) =>
  async ({ org, lineItems }: { org: string; lineItems: LineItem[] }) => {
    const poNumberResult = await PORepo.fetchNextPONumber(org);
    return poNumberResult.match(
      async (poNumber) => {
        const purchaseOrder = createPurchaseOrder({ lineItems, poNumber });
        const res = await PORepo.save(purchaseOrder);
        return res.map(() => purchaseOrder.id);
      },
      (err) => err,
    );
  };
