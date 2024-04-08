import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom, SecurityContext } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';

import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    provideEnvironmentNgxMask(),
    provideToastr(),
    importProvidersFrom(MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.NONE })),
  ],
};
