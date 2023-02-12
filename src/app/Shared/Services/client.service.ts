import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client } from '../Model/Client.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  AddClient(ClientData: any) {
    return this.http.post(this.global.APIURL + 'Client/AddClient', JSON.stringify(ClientData), httpOptions)
      .pipe(map((Response) => Response));
  }

  AddClientPhoto(ClientID : any, photo: any) {
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post(this.global.APIURL + `Client/AddClientPhoto/${ClientID}`, formData)
      .pipe(map((Response) => Response));
  }

  UpdateClient(ClientData: any) {
    return this.http.put(this.global.APIURL + 'Client/UpdateClient', JSON.stringify(ClientData), httpOptions)
      .pipe(map((Response) => Response));
  }  

  getClientDataByCredential(UserName: any, Password: any): Observable<Client[]> {
    return this.http.get<Client[]>(this.global.APIURL + `Client/getClientDataByCredential/${UserName}/${Password}`)
      .pipe(map((Response) => Response));
  }

  getClientByID(ClientID : any): Observable<Client[]> {
    return this.http.get<Client[]>(this.global.APIURL + `Client/GetClientByID/${ClientID}`)
      .pipe(map((Response) => Response));
  }




}
