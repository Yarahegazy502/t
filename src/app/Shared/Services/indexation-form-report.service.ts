import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IndexationDataMaster } from '../Model/IndexationDataMaster.model';
import { RepProjectAssay_TotalItems } from '../Model/RepProjectAssay_TotalItems.model';
import { RepProjectAssay_TotalSpaces } from '../Model/RepProjectAssay_TotalSpaces.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IndexationFormReportService {

  constructor(private http : HttpClient,
    private global : GlobalService) { }


    GetTotalItemsBySiteDataID(SiteDataID : any) : Observable<RepProjectAssay_TotalItems[]>
    {
      return this.http.get<RepProjectAssay_TotalItems[]>(this.global.APIURL + `IndexationFormReport/GetTotalItemsBySiteDataID/${SiteDataID}`)
      .pipe(
           map(Response => Response)
      );
    }


    GetTotalSpacesBySiteDataID(SiteDataID : any) : Observable<RepProjectAssay_TotalSpaces[]>
    {
      return this.http.get<RepProjectAssay_TotalSpaces[]>(this.global.APIURL + `IndexationFormReport/GetTotalSpacesBySiteDataID/${SiteDataID}`)
      .pipe(
           map(Response => Response)
      );
    }    


    GetDetailedSpacesBySiteDataID(SiteDataID : any) : Observable<IndexationDataMaster[]>
    {
      return this.http.get<IndexationDataMaster[]>(this.global.APIURL + `IndexationFormReport/GetDetailedSpacesBySiteDataID/${SiteDataID}`)
      .pipe(
           map(Response => Response)
      );
    }        
    
    
    
}
