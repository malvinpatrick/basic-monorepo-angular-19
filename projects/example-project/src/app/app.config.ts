import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideLogger } from '../shared/logger/providers';
import { LogLevel } from '../shared/logger/log-level';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideLogger({
      level: LogLevel.DEBUG,
    }),
  ],
};
