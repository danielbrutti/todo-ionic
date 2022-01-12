import { Observable } from 'rxjs';

export interface ApiService {
    get(endpoint: string, parameters: any): Observable<any>;
}
