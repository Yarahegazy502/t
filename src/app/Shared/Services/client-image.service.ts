import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client } from '../Model/Client.model';
import { ClientImage } from '../Model/ClientImage.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ClientImageService {

  constructor(private http: HttpClient, private global: GlobalService) { }


  AddClientImage(ClientID : any, photo: any) {
    var formData = new FormData();
    
    for(let i = 0; i < photo.length; i++)
    {
      formData.append('file', photo[i]);
    }    

    return this.http.post(this.global.APIURL + `ClientImage/AddClientImage/${ClientID}`, formData)
      .pipe(map((Response) => Response));
  }


  GetClientImageByClientID(ClientID : any): Observable<ClientImage[]> {
    return this.http.get<ClientImage[]>(this.global.APIURL + `ClientImage/GetClientImageByClientID/${ClientID}`)
      .pipe(map((Response) => Response));
  }

}
