import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EngineerClassification } from '../Model/EngineerClassification.model';
import { SiteType } from '../Model/SiteType.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EngineerClassificationService {

  constructor(private http : HttpClient,
    private global : GlobalService) {}

    getEngineerClassificationData() : Observable<EngineerClassification[]>
    {
      return this.http.get<EngineerClassification[]>(this.global.APIURL + 'EngineerClassification/GetAllEngineerClassification')
      .pipe(
           map(Response => Response)
      );
    }

}
