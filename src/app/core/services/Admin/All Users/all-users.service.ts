import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  constructor(private httpClient: HttpClient) { }



  private getAlUsers = environment.GET_ALL_USERS;

  getAll(data: any): Observable<any> {

    return this.httpClient.get(this.getAlUsers, data)
  }

}
