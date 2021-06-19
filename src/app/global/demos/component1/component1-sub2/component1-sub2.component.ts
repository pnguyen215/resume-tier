import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataMockService } from 'src/app/resume/services/data-mock.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/resume/model/class/board';
import { JobsTrackingService } from 'src/app/resume/services/jobs-tracking.service';
import { FormGroup } from '@angular/forms';
import { BlibsPaginatorState, BlibsSortState, BlibsGroupingState } from 'ngx-blibs-api';
import { Subscription } from 'rxjs';
import { JobsTrackingResponseModel } from 'src/app/resume/model/jobs-tracking-response.model';
import { HttpParams } from '@angular/common/http';
import { ResumeEndpoint } from 'src/app/resume/endpoints/resume-endpoint';
import { environment } from 'src/environments/environment';
import { JobsResponseModel } from 'src/app/resume/model/jobs-response.model';
import { JobsService } from 'src/app/resume/services/jobs.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-component1-sub2',
  templateUrl: './component1-sub2.component.html',
  styleUrls: ['./component1-sub2.component.scss']
})
export class Component1Sub2Component implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  jobsTrackings: JobsTrackingResponseModel[] = [];
  jobsRequest: JobsResponseModel;
  isDevMember: boolean;
  isSuperMember: boolean;
  page = 1;
  pageRequestModel = {
    pageIndex: 1,
    pageSize: 100,
    isArchived: false,
    isDeleted: false
  };
  slicePart = this.pageRequestModel.pageSize;
  paginator: BlibsPaginatorState;
  sorting: BlibsSortState;
  grouping: BlibsGroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  protected HostAPIEndpoint = environment.RESUME_SERVER_URL;
  protected relativeUrl = ResumeEndpoint.ENDPOINT_JOBS_TRACKING_URL;
  protected relativeJobsUrl = ResumeEndpoint.ENDPOINT_JOBS_URL;

  constructor(
    private dataMockService: DataMockService,
    public jobsTrackingService: JobsTrackingService,
    public jobsService: JobsService
  ) { }

  ngOnInit(): void {
    this.common();
  }

  ngOnDestroy() {
    this.dispose();
  }

  dispose() {
    this.subscriptions.forEach((subscribe) => subscribe.unsubscribe());
  }

  get Board(): Board {
    return this.dataMockService.getData();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropJobs(event: CdkDragDrop<string[]>, jobsTracking: JobsTrackingResponseModel) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.jobsRequest = event.container.data[event.currentIndex] as unknown as JobsResponseModel;
      this.jobsRequest.jobsTrackingId = jobsTracking.jobsTrackingIndex;
      this.updateJobs(this.jobsRequest.id, this.jobsRequest);
    }
  }

  fetchJobsTrackingWithParams(params: HttpParams) {
    this.jobsTrackingService.setRelativeUrlApi(this.relativeUrl.concat(ResumeEndpoint.ENDPOINT_JOBS_TRACKING_ENABLE));
    this.jobsTrackingService.setParams(params);
    this.jobsTrackingService.fetchWithParams();
    // tslint:disable-next-line: deprecation
    const subscribe = this.jobsTrackingService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.subscriptions.push(subscribe);
  }

  fetchJobsTrackingInit() {
    const params = new HttpParams()
      .set('pageIndex', '1')
      .set('pageSize', `${this.pageRequestModel.pageSize}`)
      .set('isArchived', `${this.pageRequestModel.isArchived}`)
      .set('isDeleted', `${this.pageRequestModel.isDeleted}`);
    this.fetchJobsTrackingWithParams(params);
  }

  fetchJobsTracking() {
    this.fetchJobsTrackingInit();
    this.grouping = this.jobsTrackingService.grouping;
    this.paginator = this.jobsTrackingService.paginator;
    this.sorting = this.jobsTrackingService.sorting;
    // tslint:disable-next-line: deprecation
    const subscribe = this.jobsTrackingService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.subscriptions.push(subscribe);
  }

  common() {
    this.fetchJobsTracking();
  }

  updateJobs(id: number, jobs: JobsResponseModel) {
    const params = new HttpParams().set('id', `${id}`);
    this.jobsService.setRelativeUrlApi(this.relativeJobsUrl.concat(ResumeEndpoint.ENDPOINT_JOBS_UPDATE_ONE));
    this.jobsService.setParams(params);
    const isUpdated = this.jobsService._createHttps('put', params, jobs).pipe(
      first()
    ).subscribe((response) => {
      console.log('Result updated of jobs: ', JSON.stringify(response, null, 1));
    });
    this.subscriptions.push(isUpdated);
  }

  viewJobsDetails(jobs: JobsResponseModel) {
    alert(JSON.stringify(jobs, null, 1));
  }
}
