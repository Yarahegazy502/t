import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { YearsOfExperience } from '../Model/YearsOfExperience.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class YearsOfExperienceService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetAllYearsOfExperience(): Observable<YearsOfExperience[]> {
    return this.http
      .get<YearsOfExperience[]>(
        this.global.APIURL + 'YearsOfExperience/GetAllYearsOfExperience'
      )
      .pipe(map((Response) => Response));
  }
}
