import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private MatSnackBarObj: MatSnackBar,
    private router: Router
  ) { }

  handleServiceError(err: any): void{
    console.log(err);
    let message = '';
    if (err && err.status && err.status === 401) {
      SessionStorageService.clear();
      this.router.navigate(['/auth/login']);
      return;
    }

    if (err && err.error && err.error.error) {
      message = err.error.error;
    }
    else if (err && err.error && err.error.message) {
     message = err.error.message;
    }
    else if (err && err.message && err.name==='HttpErrorResponse') {
      message = 'No Internet. Please Check your internet connection';
    }
    else if (err && err.message && err.name!='HttpErrorResponse') {
      message = err.message;
    } else {
      message = err.toString();
    }
    this.MatSnackBarObj.open(message, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snack']
    });
  }

  showError(msg: string): void{
    this.MatSnackBarObj.open(msg, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snack']
    });
  }

  showMessage(msg: string): void {
    this.MatSnackBarObj.open(msg, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
