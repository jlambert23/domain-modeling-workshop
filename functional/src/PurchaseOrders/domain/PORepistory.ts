import { errAsync, okAsync } from "neverthrow";
import { UUID } from "../../utilities/uuid";
import { IPORepository } from "./IPORepository";
import { createPONumber, parsePONumber } from "./PONumber";
import { PurchaseOrder } from "./PurchaseOrder";

class PORepository implements IPORepository {
  purchaseOrders: PurchaseOrder[] = [];
  orgPONumberMap = new Map<string, number>();
  private _validateParsedPONumber(parsed: {
    prefix: string;
    num: number;
  }): boolean {
    const lastOrgPONumber = this.orgPONumberMap.get(parsed.prefix) ?? 0;
    return parsed.num > lastOrgPONumber;
  }
  save(po: PurchaseOrder) {
    if (!po.lineItems.length) return errAsync(new Error("Missing line items"));
    const parsedPONumber = parsePONumber(po.poNumber);
    if (!parsedPONumber || !this._validateParsedPONumber(parsedPONumber))
      return errAsync(new Error("PO number is invalid"));
    this.orgPONumberMap.set(parsedPONumber.prefix, parsedPONumber.num);
    this.purchaseOrders.push(po);
    return okAsync(undefined);
  }
  fetch(id: UUID) {
    const po = this.purchaseOrders.find((p) => p.id === id);
    return po ? okAsync(po) : errAsync(new Error("not found"));
  }
  fetchNextPONumber(org: string) {
    const lastOrgPONumber = this.orgPONumberMap.get(org) ?? 0;
    return okAsync(createPONumber(org, lastOrgPONumber + 1));
  }
}
export const constructPORepository = (): IPORepository => new PORepository();
