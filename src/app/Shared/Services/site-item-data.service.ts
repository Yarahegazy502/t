import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SiteItemData } from '../Model/SiteItemData.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SiteItemDataService {

  constructor(private http : HttpClient,
    private global : GlobalService) {}

    getAllSiteItemDataBySiteDataID(SiteDataID : any) : Observable<SiteItemData[]>
    {
      return this.http.get<SiteItemData[]>(this.global.APIURL + `SiteItemData/GetAllSiteItemDataBySiteDataID/${SiteDataID}`)
      .pipe(
           map(Response => Response)
      );
    }
    
}
