import { CanActivateFn,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';


export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot , state: RouterStateSnapshot) => {
  // debugger

  const orgSession = localStorage.getItem(environment.ORGANIZER_TOKEN);


  const router: Router = inject(Router)
  const protectedRoutes: string[] = [
    '/org-dash',
    '/org-event',
  '/org-create-event',
  '/org-users'
  ,'/org-settings',
  '/create-event-success',
  '/user-invite',
  '/pagination',

];

  if(orgSession){
    protectedRoutes.includes(state.url)
  }else{
    router.navigate(['/login'])
  }

  return protectedRoutes.includes(state.url) && !orgSession ? router.navigate(['/login']):true;



};


