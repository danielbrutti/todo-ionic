import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NativeApiService } from './native.api.service';
import { AngularApiService } from './angular.api.service';

export const API_SERVICE = 'ApiService';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    /**
     * Define provider for ApiService,
     * instance will depend if running on native or browser platform.
     */
    {
      provide: API_SERVICE,
      deps: [Platform, HttpClient, HTTP],
      useFactory:
        (platform: Platform, httpClient: HttpClient, nativeHttp: HTTP) =>
          platform.is('capacitor')
            ? new NativeApiService(nativeHttp)
            : new AngularApiService(httpClient),
    }
  ]
})
export class ApiModule { }
