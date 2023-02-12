import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // public StepNumber : number = 0;
  public APIURL: string = 'https://localhost:44383/api/';
  // public APIURL: string = '/DAPI/api/';

  constructor() {}
}
