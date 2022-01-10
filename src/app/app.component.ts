import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Platform } from '@ionic/angular';
import { forkJoin, from } from 'rxjs';
import { VersionService } from './shared/services/version.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private versionService: VersionService,
    private appVersion: AppVersion,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.initAppInfo();
    });
  }

  private initAppInfo() {
    forkJoin([
      from(this.appVersion.getVersionNumber()),
      from(this.appVersion.getAppName())
    ]).subscribe((resp) => {
      this.versionService.set(resp[0], resp[1]);
    });
  }
}
