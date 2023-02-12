import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SiteType } from '../Model/SiteType.model';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SiteTypeService {

  constructor(private http : HttpClient,
              private global : GlobalService) {}

  getSiteTypeData() : Observable<SiteType[]>
  {
    return this.http.get<SiteType[]>(this.global.APIURL + 'SiteType/GetAllSiteType')
    .pipe(
         map(Response => Response)
    );
  }

  // getAllCountries(): Observable<any[]> {
  //   return this.http.get(this.apiurl.URL + "Country/GetAllCountry")
  //     .pipe(
  //       map(Response => Response.json())
  //     );
  // }

  // SaveSubjects(Subjects) {
  //   return this.http.post(this.apiurl.URL + "Subject/AddSubject", JSON.stringify(Subjects), httpOptions)
  //     .pipe(
  //     )
  // }


  // GetEnrollmentFormDataWithPhotos(strFormNumber,strCollege, strCertificatePlan, IsCalculated, IsSentNotes,IsUpdated) : Observable<EnrollmentFormModel[]> {
  //   return this.http.get(this.apiurl.URL + `EnrollmentForm/GetEnrollmentFormDataWithPhotos/${strFormNumber}/${strCollege}/${strCertificatePlan}/${IsCalculated}/${IsSentNotes}/${IsUpdated}`)
  //   .pipe(
  //     map(Response => Response.json())
  //   )
  // }

}
