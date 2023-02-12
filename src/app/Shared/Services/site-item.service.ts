import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SiteItem } from '../Model/SiteItem.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SiteItemService {

  constructor(private http : HttpClient,
              private global : GlobalService) { }


GetSiteTypeItemBySiteTypeID(SiteTypeID : any) : Observable<SiteItem[]>
  {
    return this.http.get<SiteItem[]>(this.global.APIURL + `SiteTypeItem/GetSiteTypeItemBySiteTypeID/${SiteTypeID}`)
    .pipe(
        map(Response => Response)
    );
  }

}
