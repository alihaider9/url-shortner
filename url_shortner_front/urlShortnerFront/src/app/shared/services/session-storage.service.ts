import { Injectable } from '@angular/core';

declare var localStorage: any;

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public static saveGenericJSON(name: string, val: any): void {
    localStorage.setItem(name, JSON.stringify(val));
  }

  public static clear(): void{
    localStorage.clear();
  }

  public static getGenericJSON(name: string): any {
    return JSON.parse(localStorage.getItem(name));
  }

  public static setValue(key: string, value: string): void{
    localStorage.setItem(key, value);
  }

  public static getValue(key: string): any{
    return localStorage.getItem(key);
  }
}
