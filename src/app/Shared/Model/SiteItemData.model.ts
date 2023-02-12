import { SpaceData } from "./SpaceData.model"

export interface SiteItemData
{
    siteItemDataID : string
    siteDataID : string
    siteDataName : string
    siteItemID : string
    siteItemName : string
    itemCount : number
    spaceDatas : SpaceData[]
}