import { createUuid, UUID, isUuid } from "../../utilities/uuid";

export type LineItem = {
  item: number;
  description: string;
  price: number;
  quantity: number;
};
export type PurchaseOrder = { id: UUID; lineItems: LineItem[] };
export type createPurchaseOrder = (po: {
  lineItems: LineItem[];
}) => PurchaseOrder;

export const createPurchaseOrder: createPurchaseOrder = ({ lineItems }) => ({
  id: createUuid(),
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
