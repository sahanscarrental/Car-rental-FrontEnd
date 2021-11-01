import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { LoadingService } from './service/loading.service';
import {delay} from "rxjs/operators";

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app.component.html',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private _loading: LoadingService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
        .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
        .subscribe((loading) => {
          this.loading = loading;
        });
  }

  ngOnInit() {
    this.listenToLoading();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
