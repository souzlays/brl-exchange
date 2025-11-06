import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environments';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClient),
    provideHttpClient(),
    { provide: 'ENVIRONMENT', useValue: environment }
  ]
}).catch(err => console.error(err));
