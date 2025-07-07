import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
