import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { KnowUs } from '../Model/KnowUs.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class KnowUsService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetAllKnowUs(): Observable<KnowUs[]> {
    return this.http
      .get<KnowUs[]>(this.global.APIURL + 'KnowUs/GetAllKnowUs')
      .pipe(map((Response) => Response));
  }
}
