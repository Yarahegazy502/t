import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SiteData } from '../Model/SiteData.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
};

@Injectable({
  providedIn: 'root',
})
export class SiteDataService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  AddSiteData(SiteData: any) {
    return this.http
      .post(
        this.global.APIURL + 'SiteData/AddSiteData', JSON.stringify(SiteData), httpOptions)  //JSON.stringify(SiteData)
      .pipe(map((Response) => Response)    
      );
  }

  AddSiteDataWithPhoto(SiteDataID : string, photo: any) {
    var formData = new FormData();
    for(let i = 0; i < photo.length; i++)
    {
      formData.append('file', photo[i]);
    }

    return this.http
      .post(
        this.global.APIURL + `SiteData/AddSiteDataWithPhoto/${SiteDataID}`, formData)
      .pipe(map((Response) => Response));
  }

  UpdateProjectAndEngSupervisionSiteData(SiteData: any) {
    return this.http
      .put(
        this.global.APIURL + 'SiteData/UpdateProjectAndEngSupervisionSiteData',
        JSON.stringify(SiteData),
        httpOptions
      )
      .pipe(map((Response) => Response));
  }

  GetFullSiteDataByID(SiteDataID: any): Observable<SiteData[]> {
    return this.http
      .get<SiteData[]>(
        this.global.APIURL + `SiteData/GetFullSiteDataByID/${SiteDataID}`
      )
      .pipe(map((Response) => Response));
  }

  GetFullSiteDataWithDatasByID(SiteDataID: any): Observable<SiteData[]> {
    return this.http
      .get<SiteData[]>(
        this.global.APIURL + `SiteData/GetFullSiteDataWithDatasByID/${SiteDataID}`
      )
      .pipe(map((Response) => Response));
  }

  GetSiteDataByID(SiteDataID: any): Observable<SiteData[]> {
    return this.http
      .get<SiteData[]>(
        this.global.APIURL + `SiteData/GetSiteDataByID/${SiteDataID}`
      )
      .pipe(map((Response) => Response));
  }

  GetAllSiteDataByClientID(ClientID: any, ProjectTypeID : number): Observable<SiteData[]> {
    return this.http
      .get<SiteData[]>(
        this.global.APIURL + `SiteData/GetAllSiteDataByClientID/${ClientID}/${ProjectTypeID}`
      )
      .pipe(map((Response) => Response));
  }

  DeleteSpaceOrBand(SiteData: any) {
    return this.http
      .post(
        this.global.APIURL + 'SiteData/DeleteSpaceOrBand',
        JSON.stringify(SiteData),
        httpOptions
      )
      .pipe(map((Response) => Response));
  }

  DeleteSiteData(SiteDataID: any) {
    return this.http
      .delete(this.global.APIURL + `SiteData/DeleteSiteData/${SiteDataID}`)
      .pipe(map((Response) => Response));
  }
}
