import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { SessionStorageService } from './../../shared/services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public name = '';
  public email = '';
  public password = '';

  constructor(
    public UserServiceObj: UserService,
    public ErrorHandlerServiceObj: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  signup(): void{
    this.UserServiceObj.signup(this.name, this.email, this.password).then((resp: any) => {
      SessionStorageService.setValue('token', resp['token']);
      SessionStorageService.saveGenericJSON('user', resp['user']);
        this.router.navigate(['/home']);
    }).catch((err: any) => {
      this.ErrorHandlerServiceObj.handleServiceError(err);
      console.log(err);
    });
  }

}
