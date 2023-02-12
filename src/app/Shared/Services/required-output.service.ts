import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequiredOutput } from '../Model/RequiredOutput.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RequiredOutputService {

  constructor(private http : HttpClient,
    private global : GlobalService) {}

    getRequiredOutputData() : Observable<RequiredOutput[]>
    {
      return this.http.get<RequiredOutput[]>(this.global.APIURL + 'RequiredOutput/GetAllRequiredOutput')
      .pipe(
           map(Response => Response)
      );
    }
    
}
