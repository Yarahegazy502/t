import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SpaceData } from '../Model/SpaceData.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SpaceDataService {

  constructor(private http : HttpClient,
              private global : GlobalService) { }


  AddSpaceDataRange(SpaceData : any) {
    return this.http.post(this.global.APIURL + "SpaceData/AddSpaceDataRange", JSON.stringify(SpaceData), httpOptions)
      .pipe(
        map(Response => Response)
      );
  }

  AddSpaceData(SpaceData : any) {
    return this.http.post(this.global.APIURL + "SpaceData/AddSpaceData", JSON.stringify(SpaceData), httpOptions)
      .pipe(
        map(Response => Response)
      );
  }

  UpdateSpaceData(SpaceData : any) {
    return this.http.put(this.global.APIURL + "SpaceData/UpdateSpaceData", JSON.stringify(SpaceData), httpOptions)
      .pipe(
        map(Response => Response)
      );
  }  

  AddSpaceDataWithPhoto(SpaceDataID : string, photo: any) {
    var formData = new FormData();
    for(let i = 0; i < photo.length; i++)
    {
      formData.append('file', photo[i]);
    }

    return this.http.post(this.global.APIURL + `SpaceData/AddSpaceDataWithPhoto/${SpaceDataID}`, formData)
      .pipe(
        map(Response => Response)
      );
  }  
  
  
  getSpaceDataBySiteDataID(SiteDataID : any) : Observable<SpaceData[]>
  {
    return this.http.get<SpaceData[]>(this.global.APIURL + `SpaceData/GetSpaceDataBySiteDataID/${SiteDataID}`)
    .pipe(
         map(Response => Response)
    );
  }  
              
}
