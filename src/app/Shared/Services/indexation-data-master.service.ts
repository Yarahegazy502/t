import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IndexationDataMaster } from '../Model/IndexationDataMaster.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IndexationDataMasterService {

  constructor(private http : HttpClient,
    private global : GlobalService) { }

    AddIndexationDataMaster(IndexationDataMaster : any) {
      return this.http.post(this.global.APIURL + "IndexationDataMaster/AddIndexationDataMaster", JSON.stringify(IndexationDataMaster), httpOptions)
        .pipe(
          map(Response => Response)
        );
    }

    GetIndexationDataMasterBySpaceID(SpaceID : any) : Observable<IndexationDataMaster[]>
    {
      return this.http.get<IndexationDataMaster[]>(this.global.APIURL + `IndexationDataMaster/GetIndexationDataMasterBySpaceID/${SpaceID}`)
      .pipe(
           map(Response => Response)
      );
    }      


    
}
