import { prop } from "remeda";
import { effect } from "../../utilities/effect";
import { IPORepository } from "../domain/IPORepository";
import { PONumber } from "../domain/PONumber";
import { LineItem, createPurchaseOrder } from "../domain/PurchaseOrder";

const poNumberToPurchaseOrder =
  (lineItems: LineItem[]) => (poNumber: PONumber) =>
    createPurchaseOrder({ lineItems, poNumber });

export const createPO =
  ({ PORepo }: { PORepo: IPORepository }) =>
  async ({ org, lineItems }: { org: string; lineItems: LineItem[] }) =>
    PORepo.fetchNextPONumber(org)
      .map(poNumberToPurchaseOrder(lineItems))
      .andThen(effect(PORepo.save))
      .map(prop("id"));
