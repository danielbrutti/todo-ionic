import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http/ngx';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

/**
 * Do not make this class @Injectable
 * We don't want to inject this one directly, instead we want to inject the ApiService
 *
 * `@Inject('ApiService') private apiService: ApiService`
 *
 * This way, ApiModule will take care of provice the Native or Angular implementation
 * based on mobile or browser platform.
 */
export class NativeApiService implements ApiService {

  constructor(private httpNative: HTTP) {
    console.log('Native Api Service Configured');
  }

  get(endpoint: string, parameters: any): Observable<any> {
    return from(
      this.httpNative.get(
        endpoint,
        this.stringify(parameters),
        {
          'Content-Type': 'application/json', // eslint-disable-line
        }
      )
    ).pipe(
      map((response: HTTPResponse) => JSON.parse(response.data))
    );
  }

  /**
   * This method is used to stringify URL parameters in order to avoid the error
   * `advanced-http: "params" option needs to be an dictionary style object`
   *
   * @param object to stringify
   * @returns object with all values converted to string
   */
  private stringify(object: any): any {
    return JSON.parse(
      JSON.stringify(object, (k, v) => v && typeof v === 'object' ? v : '' + v)
    );
  }
}
