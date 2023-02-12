import { IndexationItemDetail } from "./IndexationItemDetail.model";
import { IndexationItemType } from "./IndexationItemType.model";

export interface IndexationItem
{
    indexationItemID : string
    name : string
    indxType : number
    displayControl : boolean
    calculatePrice : number
    indexationItemTypeID : string
    indexationItemTypeName : string
    indxItmID : string
    type : number
    indexationItemDetails : IndexationItemDetail[]
}