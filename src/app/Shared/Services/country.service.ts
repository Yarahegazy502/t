import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../Model/Country.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetAllCountry(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.global.APIURL + 'Country/GetAllCountry')
      .pipe(map((Response) => Response));
  }
}
