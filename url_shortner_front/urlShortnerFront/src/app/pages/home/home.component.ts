import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { UserService } from './../../shared/services/user.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private UserServiceObj: UserService,
    private ErrorHandlerService: ErrorHandlerService
  ) { }

  public user: any;
  public url: string = '';
  public expiry: Date = new Date(new Date().getTime()+(7*24*60*60*1000));
  public shortenUrl: any = '';

  ngOnInit(): void {
    this.user = SessionStorageService.getGenericJSON('user');
  }

  logout(){
    SessionStorageService.clear();
    this.router.navigate(['/login']);
  }

  shorten(){
    this.shortenUrl = '';
    if(!this.url){
      this.ErrorHandlerService.showError('URL is required');
    }
    this.UserServiceObj.shorten(this.url, this.expiry).then((resp: any) => {
      this.shortenUrl = resp.shortenUrl;
    }).catch((err: any) => {
      this.ErrorHandlerService.handleServiceError(err);
    });
  }

  changePassword(){
    
  }

}
