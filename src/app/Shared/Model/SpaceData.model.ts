import { AddSpaceWindowDoorData } from "./AddSpaceWindowDoorData.model";
import { IndexationDataMaster } from "./IndexationDataMaster.model";
import { spaceOutput } from "./SpaceOutput.model";
import { SpacePhoto } from "./SpacePhoto.model";
import { SpaceWindowDoorData } from "./SpaceWindowDoorData.model";

export interface SpaceData
{
    spaceDataID? : string
    name : string
    height : number
    width : number
    length : number
    siteItemDataID? : string
    styleID : string
    styleName? : string
    spaceWindowDoorDatas : SpaceWindowDoorData[]
    indexationDataMasters? : IndexationDataMaster[]
    spaceOutputs : spaceOutput[]
    spacePhotos : SpacePhoto[]
}