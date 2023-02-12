import { IndexationItem } from "./IndexationItem.model";

export interface IndexationSiteItem
{
    indexationSiteItemID : string
    siteItemID : string
    siteItemName : string
    indexationItemID : string
    indexationItemName : string
    indexationItem : IndexationItem
}