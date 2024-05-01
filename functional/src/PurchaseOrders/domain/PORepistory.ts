import { None, Ok, Some, Err } from "oxide.ts";
import { UUID } from "../../utilities/uuid";
import { IPORepository } from "./IPORepository";
import { PurchaseOrder } from "./PurchaseOrder";
import { createPONumber, parsePONumber } from "./PONumber";

class PORepository implements IPORepository {
  purchaseOrders: PurchaseOrder[] = [];
  poNumberSeq: number = 0;
  async save(po: PurchaseOrder) {
    if (!po.lineItems.length) return Err(new Error("Missing line items"));
    const parsedPONumber = parsePONumber(po.poNumber);
    if (!parsedPONumber || parsedPONumber.num <= this.poNumberSeq) {
      return Err(new Error("PO number is invalid"));
    }
    this.purchaseOrders.push(po);
    this.poNumberSeq = parsedPONumber.num;
    return Ok(undefined);
  }
  async fetch(id: UUID) {
    const po = this.purchaseOrders.find((p) => p.id === id);
    return po ? Ok(Some(po)) : Ok(None);
  }
  async fetchNextPONumber() {
    return Ok(createPONumber("syn", this.poNumberSeq + 1));
  }
}
export const constructPORepository = () => new PORepository();
