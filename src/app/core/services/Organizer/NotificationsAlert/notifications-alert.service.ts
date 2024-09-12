import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EventObject, PageableResponse } from '../../../Interface/create-event/organizer';
import { NotificationData, NotificationResponse, SseResponse } from '../../../Interface/Organizer/notification';
import { EventSourceController, EventSourcePlus } from 'event-source-plus';
import { NotificationDataPageResponse, PageResponse } from '../../../Interface/registration/login-register';
import { NotificationService } from '@notifications//notification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsAlertService {

  private eventSource!: EventSourcePlus;
  private controller!: EventSourceController;

  constructor(private zone: NgZone, private httpClient: HttpClient, private notificationService: NotificationService) { }

  baseUrl = environment.BASE_URL;
  token = sessionStorage.getItem('Token') || '';

  Notificationsubscribe(): Observable<SseResponse> {
    return new Observable<SseResponse>((observer) => {

      this.eventSource = new EventSourcePlus(`${this.baseUrl}/notification/subscribe`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });

      this.controller = this.eventSource.listen({
        onMessage: (message) => {
          this.zone.run(() => {
            try {
              const data: SseResponse = JSON.parse(message.data);
              observer.next(data);
            } catch (error) {
              this.notificationService.showError("Error parsing message data");

            }
          });
        },
        onResponseError: ({ request, response, options }) => {
          if (response.status === 0) {
            observer.complete();
          } else {
            observer.error('EventSource error: ' + response.statusText);
          }
        }
      });

      return () => {
        if (this.controller) {
          this.controller.abort();
        }
      };

    });
  }
  
  public getAllNotification(): Observable<NotificationResponse> {
    return this.httpClient.get<NotificationResponse>(
      this.baseUrl + `/notification/all`
    );
  }
  public deleteMultipleNotifications(ids: number[]): Observable<NotificationResponse> {
    const url = `${this.baseUrl}/notification/delete`;
    const requestBody = ids; 
    return this.httpClient.post<NotificationResponse>(url, requestBody);
  }

  public getUnReadNotification(): Observable<NotificationResponse> {
    return this.httpClient.get<NotificationResponse>(
      this.baseUrl + `/notification/unread`
    );
  }

  public readAllNotification(): Observable<void> {
    return this.httpClient.put<void>(
      this.baseUrl + `/notification/mark-all-read`, []
    );
  }

  public ReadNotification(notificationId: number): Observable<void> {
    return this.httpClient.put<void>(
      this.baseUrl + `/notification/mark-read/` + notificationId, []
    );
  }

  public searchNotifications(search?: string): Observable<NotificationDataPageResponse> {
    let params = new HttpParams();

    if (search) {
      params = params.set('keyword', search);
    }

    return this.httpClient.get<NotificationDataPageResponse>(
      this.baseUrl + `/notification/all`,
      { params }
    )
  }

  unsubscribe() {
    if (this.controller) {
      this.controller.abort();
    }
  }

}
