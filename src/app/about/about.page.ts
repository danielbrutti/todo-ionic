import { Component, } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionService } from '../shared/services/version.service';


@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {

  constructor(protected versionService: VersionService) { }

  get appName(): Observable<string> {
    return this.versionService.appName$;
  }

  get version(): Observable<string> {
    return this.versionService.version$;
  }

}
