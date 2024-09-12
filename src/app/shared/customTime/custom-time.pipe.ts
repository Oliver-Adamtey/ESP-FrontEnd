import { Pipe, PipeTransform } from '@angular/core';
import { formatDate, Time } from '@angular/common';

@Pipe({
  name: 'customTime',
  standalone: true
})
export class CustomTimePipe implements PipeTransform {

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
    } catch (error) {
      console.error('Error formatting date/time:', error);
      return '';
    }
    return '';
  }

}
