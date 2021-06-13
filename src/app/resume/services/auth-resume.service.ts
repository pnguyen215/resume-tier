import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BlibsAuthenticationService, BlibsBaseUtilsService, BlibsTableService } from 'ngx-blibs-api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthEndpoint } from '../endpoints/auth-endpoint';
import { UserRequest } from '../model/user-request.model';
import { UserSuccessResponseModel } from '../model/user-success-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthResumeService extends BlibsTableService<UserSuccessResponseModel> implements OnDestroy {

  protected HostAPIEndpoint = environment.AUTH_SERVER_URL;
  protected relativeUrl = AuthEndpoint.ENDPOINT_USER_BUZZ_URL;

  constructor(
    @Inject(HttpClient) http,
    @Inject(BlibsAuthenticationService) authenticationService,
    private blibsUtilService: BlibsBaseUtilsService
  ) {
    super(http, authenticationService);
    this.setHostApi(this.HostAPIEndpoint);
    this.setRelativeUrlApi(this.relativeUrl);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }
}
