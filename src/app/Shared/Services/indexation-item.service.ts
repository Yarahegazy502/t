import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IndexationSiteItem } from '../Model/IndexationSiteItem.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IndexationItemService {

  constructor(private http : HttpClient,
    private global : GlobalService) { }


    getIndexationItemBySpaceDataID(SpaceDataID : any) : Observable<IndexationSiteItem[]>
    {
      return this.http.get<IndexationSiteItem[]>(this.global.APIURL + `IndexationItem/GetIndexationItemBySpaceDataID/${SpaceDataID}`)
      .pipe(
           map(Response => Response)
      );
    }  
    
}
