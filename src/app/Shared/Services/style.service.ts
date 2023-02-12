import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Style } from '../Model/Style.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(private http : HttpClient,
    private global : GlobalService) {}

    getStyleData() : Observable<Style[]>
    {
      return this.http.get<Style[]>(this.global.APIURL + 'Style/GetAllStyle')
      .pipe(
           map(Response => Response)
      );
    }
    
}
