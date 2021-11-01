import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { SnackbarService } from 'ngx-snackbar';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackbarService: SnackbarService, private toastrService: ToastrService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(

        tap(evt => {
            if (evt instanceof HttpResponse) {
                if(evt.status == 200) {
                    let message = evt.body.message;
                    /*if (message !== null) {
                        this.toastrService.success("",message);
                    }*/

                }
            }
        }),
        catchError((error: HttpErrorResponse ) => {
          this.snackbarService.clear();
            if (error.status == 500) {
                this.toastrService.error('Internal Server Error', 'Error');
            } else if (error.status == 404) {
                if (error.error && error.error.body.message) {
                    this.toastrService.error((error.error.body.message).split('{')[0], 'Error');
                } else {
                    this.toastrService.error('page not found', 'Error');
                }
            } else if (error.status === 400) {
                if (error && error?.error) {
                    let m = error.error.body.message;
                    if (m == null) {
                        m = 'Invalid request body';
                    }
                    this.toastrService.error(m, 'Error');

                } else {
                    let m = error.statusText;
                    if (m == null) {
                        m = 'Invalid request body';
                    }
                    this.toastrService.error(m, 'Error');
                }
            } else if (error.status === 401) {
                let message = error.error.message;
                if (message == null) {
                    message = 'You are not authorize';
                }
                this.toastrService.error(message, 'Error');
            } else if (error.status === 503) {
                let message = error.error.error;
                if (!message) {
                    message = 'Service Unavailable';
                }
                this.toastrService.error(message, 'Error');
            }
          return throwError(error);
        })
    );
  }
}
