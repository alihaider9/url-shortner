import { Injectable, NgModule } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from './../../../environments/environment'
import { finalize } from 'rxjs/operators';

declare var document: any;

export class TokenInjectorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (SessionStorageService.getValue('token') && req.url.includes(environment.serviceUrlPrefix)) {
       req = req.clone({
         setHeaders: {
          Authorization: SessionStorageService.getValue('token')
         }
        });
    }
    return next.handle(req)
   }
  constructor() { }
}

@NgModule({
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInjectorService, multi: true }
  ]
 })
 export class InterceptorModule { }
