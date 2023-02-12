import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Gender } from '../Model/Gender.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetAllGender(): Observable<Gender[]> {
    return this.http
      .get<Gender[]>(this.global.APIURL + 'Gender/GetAllGender')
      .pipe(map((Response) => Response));
  }
}
