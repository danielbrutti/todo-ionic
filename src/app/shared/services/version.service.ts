import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  /**
   * Data available though observables,
   * to which other parts of the application can subscribe to
   */
  version$: Observable<string>;
  appName$: Observable<string>;

  /**
   * by not exposing the subject, the VersionService controls the ability
   * to emit new user objects to other parts of the application
   */
  private version: BehaviorSubject<string> = new BehaviorSubject('@browser');
  private appName: BehaviorSubject<string> = new BehaviorSubject('Todo App');

  constructor() {
    this.version$ = this.version.asObservable();
    this.appName$ = this.appName.asObservable();
  }

  set(version: string, appName: string): void {
    this.version.next(version);
    this.appName.next(appName);
  }
}
