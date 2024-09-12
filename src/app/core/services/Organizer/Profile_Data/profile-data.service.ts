import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventObject, ProfileData, ProfileResponse } from '@interface/create-event/organizer';

@Injectable({
  providedIn: 'root'
})

export class ProfileDataService {
  userId = sessionStorage.getItem('userId');
  baseUrl = environment.ORG_GET_PROFILE;

  constructor(private httpClient: HttpClient) {}

  public getProfileData(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(
      this.baseUrl + `/${this.userId}`
    );
  }

}
