import { createUuid, UUID, isUuid } from "../../utilities/uuid";
import { PONumber } from "./PONumber";

export type LineItem = {
  item: number;
  description: string;
  price: number;
  quantity: number;
};

export type PurchaseOrder = {
  id: UUID;
  lineItems: LineItem[];
  poNumber: PONumber;
};

export type createPurchaseOrder = (po: {
  poNumber: PONumber;
  lineItems: LineItem[];
}) => PurchaseOrder;

export const createPurchaseOrder: createPurchaseOrder = ({
  poNumber,
  lineItems,
}) => ({
  id: createUuid(),
  poNumber,
  lineItems,
});

export const isPurchaseOrder = (s: any): s is PurchaseOrder => {
  if (typeof s !== "object") return false;

  const po = s as PurchaseOrder;
  if (!po.id) return false;
  if (!isUuid(po.id)) return false;
  if (!po.lineItems?.length) return false;

  return true;
};
