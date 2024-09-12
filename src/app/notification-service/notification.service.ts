import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  deleteMultipleNotifications(selectedNotificationIds: number[]) {
    throw new Error('Method not implemented.');
  }
  getNotifications() {
    throw new Error('Method not implemented.');
  }

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success', {
      toastClass: 'ngx-toastr custom-toast custom-toast-success',
      closeButton: true,
      progressBar: true
    } as IndividualConfig);
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error', {
      toastClass: 'ngx-toastr custom-toast custom-toast-error',
      closeButton: true,
      progressBar: true
    } as IndividualConfig);
  }
}
