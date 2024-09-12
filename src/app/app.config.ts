import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DateModule } from './date/date.module';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
