import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ClientVideo } from '../Model/ClientVideo.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ClientVideoService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  AddClientVideo(ClientID : any, photo: any) {
    var formData = new FormData();
    
    for(let i = 0; i < photo.length; i++)
    {
      formData.append('file', photo[i]);
    }    

    return this.http.post(this.global.APIURL + `ClientVideo/AddClientVideo/${ClientID}`, formData)
      .pipe(map((Response) => Response));
  }


  GetClientVideoByClientID(ClientID : any): Observable<ClientVideo[]> {
    return this.http.get<ClientVideo[]>(this.global.APIURL + `ClientVideo/GetClientVideoByClientID/${ClientID}`)
      .pipe(map((Response) => Response));
  }




  
}
