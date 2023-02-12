import { ListOfIDs } from './ListOfIDs.model';

export interface DeleteSpaceOrBand {
  siteDataID: string;
  flag: number;
  ListOfIDs: ListOfIDs[];
}
