import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataMockService } from 'src/app/resume/services/data-mock.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/resume/model/class/board';
import { JobsTrackingService } from 'src/app/resume/services/jobs-tracking.service';
import { FormGroup } from '@angular/forms';
import { BlibsPaginatorState, BlibsSortState, BlibsGroupingState, BlibsBaseUtilsService } from 'ngx-blibs-api';
import { Subscription } from 'rxjs';
import { JobsTrackingResponseModel } from 'src/app/resume/model/jobs-tracking-response.model';
import { HttpParams } from '@angular/common/http';
import { ResumeEndpoint } from 'src/app/resume/endpoints/resume-endpoint';
import { environment } from 'src/environments/environment';
import { JobsResponseModel } from 'src/app/resume/model/jobs-response.model';
import { JobsService } from 'src/app/resume/services/jobs.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component1Sub4Component } from '../component1-sub4/component1-sub4.component';
import { JobsTracking } from 'src/app/resume/model/enums/jobs-tracking';
import { Component1Sub5Component } from '../component1-sub5/component1-sub5.component';


@Component({
  selector: 'app-component1-sub2',
  templateUrl: './component1-sub2.component.html',
  styleUrls: ['./component1-sub2.component.scss']
})
export class Component1Sub2Component implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  jobsTrackings: JobsTrackingResponseModel[] = [];
  dataJobsTracking: any[] = [];
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
    private modalService: NgbModal,
    private dataMockService: DataMockService,
    public jobsTrackingService: JobsTrackingService,
    private blibsUtilService: BlibsBaseUtilsService,
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
    this.dataJobsTracking = this.blibsUtilService.enumToDescriptedArray(JobsTracking)
      .sort((a, b) => (a.id < b.id ? -1 : 1));
    this.fetchJobsTracking();
  }

  updateJobs(id: number, jobs: JobsResponseModel) {
    const params = new HttpParams().set('id', `${id}`);
    this.jobsService.setRelativeUrlApi(this.relativeJobsUrl.concat(ResumeEndpoint.ENDPOINT_JOBS_UPDATE_ONE));
    this.jobsService.setParams(params);
    const isUpdated = this.jobsService._createHttps('put', params, jobs).pipe(
      first()
    ).subscribe((response) => {
    });
    this.subscriptions.push(isUpdated);
  }

  viewJobsDetails(jobs: JobsResponseModel) {
    const modalRef = this.modalService.open(Component1Sub4Component, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.jobs = jobs;
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }


  changeStatusJobsIcon(jobsTrackingIndex: number): string {

    if (!this.blibsUtilService.areNotNull(jobsTrackingIndex)) {
      return null;
    }
    const jobsTrackingId = this.dataJobsTracking[jobsTrackingIndex - 1].id;

    if (jobsTrackingId === 1) {
      return 'flaticon2-correct text-success font-weight-bold';
    }

    if (jobsTrackingId === 2) {
      return 'flaticon-list text-info font-weight-bold';
    }

    if (jobsTrackingId === 3) {
      return 'flaticon2-check-mark text-success font-weight-bold';
    }

    if (jobsTrackingId === 4) {
      return 'flaticon2-contrast text-danger font-weight-bold';
    }

    if (jobsTrackingId === 5) {
      return 'flaticon2-bell text-warning font-weight-bold';
    }

    if (jobsTrackingId === 6) {
      return 'flaticon2-cancel text-muted font-weight-bold';
    }

    if (jobsTrackingId === 7) {
      return 'flaticon2-layers-2 font-weight-bold text-primary ';
    }

    if (jobsTrackingId === 8) {
      return 'flaticon2-bell-1 text-warning font-weight-bold';
    }

    return null;
  }

  openAddJobs(jobsTracking: JobsTrackingResponseModel) {
    const modalRef = this.modalService.open(Component1Sub5Component, {
      size: 'md',
      centered: true,
      keyboard: true,
      animation: true
    });
    modalRef.componentInstance.jobsTracking = jobsTracking;
  }

}
