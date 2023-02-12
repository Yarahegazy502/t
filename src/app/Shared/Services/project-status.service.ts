import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProjectStatus } from '../Model/ProjectStatus.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {

  constructor(private http : HttpClient,
    private global : GlobalService) {}


    getAllProjectStatus() : Observable<ProjectStatus[]>
    {
      return this.http.get<ProjectStatus[]>(this.global.APIURL + 'ProjectStatus/GetAllProjectStatus')
      .pipe(
           map(Response => Response)
      );
    }

    
}
