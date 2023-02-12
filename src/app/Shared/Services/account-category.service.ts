import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AccountCategory } from '../Model/AccountCategory.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AccountCategoryService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  GetAccountCategoryByAccountTypeID(
    AccountTypeID: any
  ): Observable<AccountCategory[]> {
    return this.http
      .get<AccountCategory[]>(
        this.global.APIURL +
          `AccountCategory/GetAccountCategoryByAccountTypeID/${AccountTypeID}`
      )
      .pipe(map((Response) => Response));
  }
}
