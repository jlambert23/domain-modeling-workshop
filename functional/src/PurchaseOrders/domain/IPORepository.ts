import { ResultAsync } from "neverthrow";
import { UUID } from "../../utilities/uuid";
import { PONumber } from "./PONumber";
import { PurchaseOrder } from "./PurchaseOrder";

export interface IPORepository {
  save: (po: PurchaseOrder) => ResultAsync<null, Error>;
  fetch: (id: UUID) => ResultAsync<PurchaseOrder, Error>;
  fetchNextPONumber: (org: string) => ResultAsync<PONumber, never>;
}
