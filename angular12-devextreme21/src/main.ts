import {environment} from '@environment';
import themes from 'devextreme/ui/themes';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from '@app/app.module';

if (environment.production) {
  enableProdMode();
}

themes.initialized(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
      if (!environment.production) {
        console.log('AppModule loaded');
      }
    })
    .catch(err => console.error(err));
});
