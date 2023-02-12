import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AccountType } from '../Model/AccountType.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetAllAccountType(): Observable<AccountType[]> {
    return this.http
      .get<AccountType[]>(this.global.APIURL + 'AccountType/GetAllAccountType')
      .pipe(map((Response) => Response));
  }
}
