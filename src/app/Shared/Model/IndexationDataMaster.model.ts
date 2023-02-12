import { IndexationDataDetail } from './IndexationDataDetail.model';

export interface IndexationDataMaster {
  indexationDataMasterID?: string;
  siteDataID: string;
  spaceID: string;
  spaceName?: string;
  total: number;
  indexationDataDetails: IndexationDataDetail[];
}
