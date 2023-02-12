import { IndexationDataDetailD } from './IndexationDataDetailD.model';

export interface IndexationDataDetail {
  indexationDataDetailID?: string;
  indexationDataMasterID?: string;
  indexationItemID: string;
  indexationItemName?: string;
  total: number;
  indxType?: number;
  calculatePrice?: number;
  indxItmID?: string;
  indexationDataDetailDs: IndexationDataDetailD[];
}
