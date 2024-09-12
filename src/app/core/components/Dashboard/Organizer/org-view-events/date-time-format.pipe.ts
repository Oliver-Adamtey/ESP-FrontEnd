import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { NotificationService } from '@notifications//notification.service';

@Pipe({
  name: 'dateTimeFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

  constructor(
    private notificationService: NotificationService,

  ){

  }

  transform(date?: string, time?: string): string {
    if (!date && !time) {
      return '';  
    }

    return this.formatDateTime(date, time);
  }

  private formatDateTime(date?: string, time?: string): string {
    try {
      if (date && time) {
        const dateObj = new Date(`${date}T${time}`);
        return formatDate(dateObj, 'd MMMM yyyy, h:mm a', 'en-US');
      } else if (date) {
        const dateObj = new Date(date);
        return formatDate(dateObj, 'd MMMM yyyy', 'en-US');
      } else if (time) {
        const dateObj = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) {
          throw new Error('Invalid time format');
        }
        dateObj.setHours(hours, minutes);
        return formatDate(dateObj, 'h:mm a', 'en-US');
      }
    }catch(error){
      this.notificationService.showError('An unexpected error occurred');
      return '';
    }
    
    return '';
  }

}
