import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { City } from '../Model/City.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetCityByGovernorateID(GovernorateID: any): Observable<City[]> {
    return this.http
      .get<City[]>(
        this.global.APIURL + `City/GetCityByGovernorateID/${GovernorateID}`
      )
      .pipe(map((Response) => Response));
  }
}
