import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { District } from '../Model/District.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetDistrictByGovernorateID(GovernorateID: any): Observable<District[]> {
    return this.http
      .get<District[]>(
        this.global.APIURL + `District/GetDistrictByGovernorateID/${GovernorateID}`
      )
      .pipe(map((Response) => Response));
  }
}
