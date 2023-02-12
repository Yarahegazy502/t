import { siteEngineerClassifications } from './siteEngineerClassifications.model';
import { SiteItemData } from './SiteItemData.model';
import { SitePhotos } from './sitePhoto.model';

export interface SiteData {
  siteDataID: string;
  address: string;
  area: number;
  floor: number;
  ClientID: string;
  ClientName: string;
  projectStatusID: string;
  projectStatusName: string;
  isDisplayWall: boolean;
  isAddToStore: boolean;
  engSupervision: boolean;
  siteTypeID: string;
  siteTypeName: string;
  siteItemDatas: SiteItemData[];
  siteEngineerClassifications? : siteEngineerClassifications[];
  sitePhotos : SitePhotos[];
  projectType : number;
}
