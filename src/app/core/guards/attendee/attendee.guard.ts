import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../../environments/environment';

export const attendeeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot ) => {

  const adminSession = typeof localStorage !== 'undefined' ? localStorage.getItem(environment.ATTENDEE_TOKEN) : null;

  const router: Router = inject(Router);
  const protectedRoutes: string[] = [
    // '/admin-dash',
    // '/admin-event',
    // '/admin-users',
    // '/admin-create-event',
    // '/admin-settings',
  ];

  if (adminSession) {
    return protectedRoutes.includes(state.url);
  } else {
    router.navigate(['/login']);
    return false;
  }
};
