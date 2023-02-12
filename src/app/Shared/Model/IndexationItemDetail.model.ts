import { IndexationItemDetailsPrice } from "./IndexationItemDetailsPrice.model";

export interface IndexationItemDetail
{
    indexationItemDetailID : string
    indexationItemID : string
    indexationItemName : string
    name : string
    calculatePriceMethod : number
    supplyPrice : number
    workmanShipPrice : number
    indexationItemDetailsPricesM : IndexationItemDetailsPrice[]
}