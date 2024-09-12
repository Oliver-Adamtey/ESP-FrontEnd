import { inject, Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { NotificationService } from '@notifications//notification.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];
  private ignoreNextUrl: string | null = null;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.ignoreNextUrl === event.urlAfterRedirects) {
          this.ignoreNextUrl = null;
          return;
        }
        if (this.history.length === 0 || this.history[this.history.length - 1] !== event.urlAfterRedirects) {
          this.history.push(event.urlAfterRedirects);
        }
      }
    });
  }

  back(): void {
    if (this.history.length > 1) {
      this.history.pop();
      const previousUrl = this.history.pop();
      if (previousUrl) {
        this.ignoreNextUrl = previousUrl; 
        this.router.navigateByUrl(previousUrl).catch(err => console.error('Navigation error:', err));
      }
    } else {
      if (this.history.length) {
        const previousUrl = this.history[0];
        this.ignoreNextUrl = previousUrl;
        this.router.navigateByUrl(previousUrl).catch(err => console.error('Navigation error:', err));
      }
    }
  }
}
