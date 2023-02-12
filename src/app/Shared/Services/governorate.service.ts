import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Governorate } from '../Model/Governorate.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GovernorateService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetGovernorateByCountryID(CountryID: any): Observable<Governorate[]> {
    return this.http
      .get<Governorate[]>(
        this.global.APIURL +
          `Governorate/GetGovernorateByCountryID/${CountryID}`
      )
      .pipe(map((Response) => Response));
  }
}
