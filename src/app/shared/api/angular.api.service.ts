import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class AngularApiService implements ApiService {

  constructor(private httpClient: HttpClient) {
    console.log('Angular Api Service Configured');
  }

  get(endpoint: string, parameters: any): Observable<any> {
    return this.httpClient.get(endpoint, {
      params: parameters,
      headers: {
        'Content-Type': 'application/json', // eslint-disable-line
      }
    });
  }
}
