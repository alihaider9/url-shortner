import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private HttpClientObj: HttpClient
  ) { }

  login(email: string, password: string): any {
    return new Promise((resolve, reject) => {
      return this.HttpClientObj.post(environment.serviceUrlPrefix + '/user/login', { email, password })
        .subscribe(data => {
          resolve(data);
        },
        err => {
          reject(err);
        });
    });
  }

  signup(name: string, email: string, password: string): any {
    return new Promise((resolve, reject) => {
      return this.HttpClientObj.post(environment.serviceUrlPrefix + '/user/signup', { name, email, password })
        .subscribe(data => {
          resolve(data);
        },
        err => {
          reject(err);
        });
    });
  }

  shorten(url: string, expiry: Date): any {
    return new Promise((resolve, reject) => {
      return this.HttpClientObj.post(environment.serviceUrlPrefix + '/shortner/shorten', { url, expiry })
        .subscribe(data => {
          resolve(data);
        },
        err => {
          reject(err);
        });
    });
  }

  fullUrl(shortCode: string): any {
    return new Promise((resolve, reject) => {
      return this.HttpClientObj.get(environment.serviceUrlPrefix + '/shortner/fullUrl/' + shortCode,)
        .subscribe(data => {
          resolve(data);
        },
        err => {
          reject(err);
        });
    });
  }

}
