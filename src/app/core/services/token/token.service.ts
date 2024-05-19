import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenUrl = environment.TOKEN_URL;

  constructor(private httpClient: HttpClient) { }

  sendTokenData(data: any): Observable<any> {
    return this.httpClient.post<any>(this.tokenUrl, data);
  }



}
