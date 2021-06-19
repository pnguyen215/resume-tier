import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BlibsAuthenticationService, BlibsTableService } from 'ngx-blibs-api';
import { environment } from 'src/environments/environment';
import { ResumeEndpoint } from '../endpoints/resume-endpoint';
import { JobsTrackingResponseModel } from '../model/jobs-tracking-response.model';

@Injectable({
  providedIn: 'root'
})
export class JobsTrackingService extends BlibsTableService<JobsTrackingResponseModel> implements OnDestroy {

  protected HostAPIEndpoint = environment.RESUME_SERVER_URL;
  protected relativeUrl = ResumeEndpoint.ENDPOINT_JOBS_TRACKING_URL;

  constructor(
    @Inject(HttpClient) http,
    @Inject(BlibsAuthenticationService) authenticationService) {
    super(http, authenticationService);
    this.setHostApi(this.HostAPIEndpoint);
    this.setRelativeUrlApi(this.relativeUrl);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }
}
