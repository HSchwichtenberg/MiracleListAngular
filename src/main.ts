

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app.module';
import { TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core'; // for i18n

// import { AppModule } from './angular2-contextmenu/demo/app.module'

if (environment.production) {
  enableProdMode();
}

// we use the webpack raw-loader to return the content as a string
// const translations = require(`raw-loader!./locale/messages.en.xlf`)

platformBrowserDynamic().bootstrapModule(AppModule,
{
  // providers: [
  //   {provide: TRANSLATIONS, useValue: translations},
  //   {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  // ]
});
