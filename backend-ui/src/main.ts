import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BaseUrlService } from '@app/services/baseUrl';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const baseUrlService = new BaseUrlService()
baseUrlService.fetchBaseUrl().then(baseUrl => {

  if (environment.production) {
    const adminVirtualFolderReg = `^[/]{0,1}(${baseUrl})[/]{0,1}`
    const regexAdminFolder = new RegExp(adminVirtualFolderReg, 'i')
    const processedUrl = baseUrl.replace(regexAdminFolder, '/$1')

    window['baseUrl'] = processedUrl
  } // will be undefined on dev mode

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
})