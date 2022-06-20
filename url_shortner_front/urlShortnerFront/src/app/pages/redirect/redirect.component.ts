import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

declare var window: any;

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    private UserServiceObj: UserService,
    private ErrorHandlerService: ErrorHandlerService
  ) { }

  public shortCode: string = '';
  public error = 'redirecting';

  ngOnInit(): void {
    this.shortCode = this.route.snapshot.paramMap.get('shortCode') || '';
    this.UserServiceObj.fullUrl(this.shortCode).then((resp: any) => {
      this.error = resp.error;
      if(resp && resp.url){
        window.location.href = resp.url;
      }
    }).catch((err: any) => {
      this.ErrorHandlerService.handleServiceError(err);
    });
  }

}
