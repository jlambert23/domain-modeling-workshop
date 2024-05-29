import { errAsync, okAsync } from "neverthrow";
import { UUID } from "../../utilities/uuid";
import { IPORepository } from "./IPORepository";
import { PONumber } from "./PONumber";
import { PurchaseOrder } from "./PurchaseOrder";

export const constructPORepository = (): IPORepository => {
  const purchaseOrders: PurchaseOrder[] = [];
  const orgPONumberMap = new Map<string, number>();

  const validateParsedPONumber = (parsed: {
    prefix: string;
    num: number;
  }): boolean => {
    const lastOrgPONumber = orgPONumberMap.get(parsed.prefix) ?? 0;
    return parsed.num > lastOrgPONumber;
  };

  return {
    save(po: PurchaseOrder) {
      if (!po.lineItems.length)
        return errAsync(new Error("Missing line items"));
      const parsedPONumber = {
        prefix: PONumber.prefix(po.poNumber),
        num: PONumber.value(po.poNumber),
      };
      if (!validateParsedPONumber(parsedPONumber))
        return errAsync(new Error("PO number is invalid"));
      orgPONumberMap.set(parsedPONumber.prefix, parsedPONumber.num);
      purchaseOrders.push(po);
      return okAsync(null);
    },
    fetch(id: UUID) {
      const po = purchaseOrders.find((p) => p.id === id);
      return po ? okAsync(po) : errAsync(new Error("not found"));
    },
    fetchNextPONumber(org: string) {
      const lastOrgPONumber = orgPONumberMap.get(org) ?? 0;
      return okAsync(PONumber.create(org, lastOrgPONumber + 1));
    },
  };
};
