import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Setting } from '../Model/Setting.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http : HttpClient,
              private global : GlobalService) {}

    getSettingByName(strSettingName : string) : Observable<any[]>
    {
      return this.http.get<any[]>(this.global.APIURL + `Setting/GetSettingByName/${strSettingName}`)
      .pipe(
           map(Response => Response)
      );
    }
    
}
