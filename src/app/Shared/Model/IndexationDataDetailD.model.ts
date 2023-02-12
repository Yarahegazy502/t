import { IndexationDataDetailDPrice } from "./IndexationDataDetailDPrice.model"

export interface IndexationDataDetailD
{
    indexationDataDetailDID? : string
    indexationDataDetailID? : string
    indexationItemDetailID : string
    indexationItemDetailName? : string
    itemCount : number
    supplyPrice : number
    workmanShipPrice : number
    superVisionPrice : number
    total : number
    calculatePriceMethod? : number
    indexationDataDetailDPrices : IndexationDataDetailDPrice[]
}