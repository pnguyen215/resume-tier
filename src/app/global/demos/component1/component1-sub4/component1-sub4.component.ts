import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal, NgbTimepickerConfig, NgbTimeStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { BlibsBaseUtilsService } from 'ngx-blibs-api';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, filter, finalize, map, tap } from 'rxjs/operators';
import { ParamsConfig } from 'src/app/global/configs/paramsConfig/params-config';
import { ResumeEndpoint } from 'src/app/resume/endpoints/resume-endpoint';
import { JobsStatus } from 'src/app/resume/model/enums/jobs-status';
import { JobsTracking } from 'src/app/resume/model/enums/jobs-tracking';
import { ErrorStatus, ExceptionModel } from 'src/app/resume/model/exception.model';
import { JobsResponseModel } from 'src/app/resume/model/jobs-response.model';
import { JobsService } from 'src/app/resume/services/jobs.service';
import { NotificationService } from 'src/app/resume/services/notification.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { environment } from 'src/environments/environment';

const STATE_DEFAULT: ExceptionModel = {
  code: 200,
  hasError: false,
  status: ErrorStatus.SUCCESS,
  messageError: '',
  description: ''
};

@Component({
  selector: 'app-component1-sub4',
  templateUrl: './component1-sub4.component.html',
  styleUrls: ['./component1-sub4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    NgbTimepickerConfig,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class Component1Sub4Component implements OnInit, OnDestroy {

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @Input() jobs: JobsResponseModel;
  @Output() state: EventEmitter<ExceptionModel> = new EventEmitter();

  isLoading$;
  isLoading = false;
  hasError = false;
  formGroup: FormGroup;
  isDevMember: boolean;
  statusInterview: any;
  noteJobs: any;
  descriptionJobs: any;
  messagesError: any;
  isTurnOnDescription = false;
  isTurnOnNote = false;
  dataJobsTracking: any[] = [];
  dataJobsStatus: any[] = [];
  dataOriginalJobsStatus: any[] = [];
  prepareState: ExceptionModel;
  time: NgbTimeStruct = { hour: new Date().getHours(), minute: new Date().getMinutes(), second: new Date().getSeconds() };
  private subscriptions: Subscription[] = [];
  protected HostAPIEndpoint = environment.RESUME_SERVER_URL;
  protected relativeUrl = ResumeEndpoint.ENDPOINT_JOBS_URL;


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private datePipeService: DatePipe,
    private jobsService: JobsService,
    private blibsUtilService: BlibsBaseUtilsService,
    private notificationService: NotificationService
  ) { }

  searchText = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    /*
      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.dataOriginalJobsStatus
        : this.dataOriginalJobsStatus.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
    */

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.dataOriginalJobsStatus
          : this.dataOriginalJobsStatus.filter(
            (v) => v
          )
        ).slice(0, 10)
      )
    );
  }

  ngOnInit(): void {
    this.isLoading$ = this.jobsService.isLoading$;
    this.loadForm();
    this.bindingData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }

  reset() {
    this.formGroup.reset();
    this.modal.dismiss();
  }

  bindingData() {
    this.statusInterview = this.jobs.nameStatusJobAfterInterview;
    this.noteJobs = this.jobs.note;
    this.descriptionJobs = this.jobs.description;
    this.dataJobsTracking = this.blibsUtilService.enumToDescriptedArray(JobsTracking);
    this.dataJobsStatus = this.blibsUtilService.enumToDescriptedArray(JobsStatus);
    this.pushDataJobsStatus();
  }

  pushDataJobsStatus() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.dataJobsStatus.length; i++) {
      this.dataOriginalJobsStatus.push(this.dataJobsStatus[i].description);
    }
  }

  get forms() {
    return this.formGroup.controls;
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  changeSymbolState(value): any {
    if (!this.blibsUtilService.areNotNull(value)) {
      return null;
    }
    return this.datePipeService.transform(`${value}`, ParamsConfig.getDateFormattedGlobal());
  }

  changeSymbolStateDefault(value): any {
    if (!this.blibsUtilService.areNotNull(value)) {
      return null;
    }
    return this.datePipeService.transform(`${value}`, ParamsConfig.getDateFormSendToAPI());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      createdTime: [this.jobs.createdTime],
      createdBy: [this.jobs.createdBy],
      modifiedTime: [this.jobs.modifiedTime],
      modifiedBy: [this.jobs.modifiedBy],
      deleted: [this.jobs.deleted],
      archived: [this.jobs.archived],
      description: [this.jobs.description],
      company: [this.jobs.company, Validators.compose([Validators.required, Validators.minLength(5)])],
      jobsTitle: [this.jobs.jobsTitle, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      linkOfCompany: [this.jobs.linkOfCompany, Validators.compose([Validators.pattern(ParamsConfig.getUrlRegexExpression())])],
      locationOrAddressCompany: [this.jobs.locationOrAddressCompany],
      salary: [this.jobs.salary, Validators.compose([Validators.pattern(ParamsConfig.getNumberPositiveRegexExpression())])],
      note: [this.jobs.note],
      linkLogoOfCompany: [this.jobs.linkLogoOfCompany],
      nameStatusJobAfterInterview: [this.jobs.nameStatusJobAfterInterview],
      valueStatusJobAfterInterview: [this.jobs.valueStatusJobAfterInterview],
      interviewTime: [this.changeSymbolState(this.jobs.interviewTime)],
      interviewResponseTime: [this.changeSymbolState(this.jobs.interviewResponseTime)],
      startWorkingOn: [this.changeSymbolState(this.jobs.startWorkingOn)],
      finishWorkOn: [this.changeSymbolState(this.jobs.finishWorkOn)],
      startProbationaryPeriod: [this.changeSymbolState(this.jobs.startProbationaryPeriod)],
      endOfProbationaryPeriod: [this.changeSymbolState(this.jobs.endOfProbationaryPeriod)],
      durationInterviewedPeriod: [this.jobs.durationInterviewedPeriod],
      durationProbationariesPeriod: [this.jobs.durationProbationariesPeriod],
      durationWorkingOn: [this.jobs.durationWorkingOn],
      valueOfDurationInterviewedPeriod: [this.jobs.valueOfDurationInterviewedPeriod],
      valueOfDurationProbationariesPeriod: [this.jobs.valueOfDurationProbationariesPeriod],
      valueOfDurationWorkingOn: [this.jobs.valueOfDurationWorkingOn],
      jobsTrackingId: [this.jobs.jobsTrackingId],
      likeStatus: [this.jobs.likeStatus]
    });
  }

  private prepareJobs() {
    const formData = this.formGroup.value;
    this.jobs.createdTime = formData.createdTime;
    this.jobs.createdBy = formData.createdBy;
    this.jobs.modifiedTime = formData.modifiedTime;
    this.jobs.modifiedBy = formData.modifiedBy;
    this.jobs.deleted = formData.deleted;
    this.jobs.archived = formData.archived;
    this.jobs.description = formData.description;
    this.jobs.company = formData.company;
    this.jobs.jobsTitle = formData.jobsTitle;
    this.jobs.linkOfCompany = formData.linkOfCompany;
    this.jobs.locationOrAddressCompany = formData.locationOrAddressCompany;
    this.jobs.salary = formData.salary;
    this.jobs.note = formData.note;
    this.jobs.linkLogoOfCompany = formData.linkLogoOfCompany;
    this.jobs.nameStatusJobAfterInterview = formData.nameStatusJobAfterInterview;
    this.jobs.interviewTime = this.changeSymbolStateDefault(this.handleTime(formData.interviewTime, ' '));
    this.jobs.interviewResponseTime = this.changeSymbolStateDefault(this.handleTime(formData.interviewResponseTime, ' '));
    this.jobs.startWorkingOn = this.changeSymbolStateDefault(this.handleTime(formData.startWorkingOn, ' '));
    this.jobs.finishWorkOn = this.changeSymbolStateDefault(this.handleTime(formData.finishWorkOn, ' '));
    this.jobs.startProbationaryPeriod = this.changeSymbolStateDefault(this.handleTime(formData.startProbationaryPeriod, ' '));
    this.jobs.endOfProbationaryPeriod = this.changeSymbolStateDefault(this.handleTime(formData.endOfProbationaryPeriod, ' '));
    this.jobs.jobsTrackingId = formData.jobsTrackingId;
    this.jobs.likeStatus = formData.likeStatus;
  }

  goToLink(url: string) {
    if (!this.blibsUtilService.areNotNull(url) || url === '' || url === undefined) {
      return;
    } else {
      window.open(url, '_blank');
    }

  }

  /***
 * @param time - time request in form NgbTimeStruct : object
 * @apiNote - return string in form: hh:mm:ss
 */
  onChangeTimeInForm(time: NgbTimeStruct): string | null {
    if (!time) {
      return '';
    }
    return time.hour + ':' + time.minute + ':' + time.second;
  }

  handleTime(values: any, delimeter: string): Date {
    if (!this.blibsUtilService.areNotNull(values)) {
      return null;
    }
    if (!this.blibsUtilService.areNotNull(delimeter)) {
      delimeter = ' ';
    }
    const times = values.split(delimeter);
    return (this.blibsUtilService.onChangeDateNormalizeManual(times[0], '/', '-') + ' ' +
      this.onChangeTimeInForm(this.time)) as unknown as Date;
  }

  isJobsExperience(): boolean {
    if (this.jobs.jobsTrackingId === this.dataJobsTracking[6].id) {
      return true;
    }
    return false;
  }

  isJobsWorking(): boolean {
    if (this.jobs.jobsTrackingId === this.dataJobsTracking[0].id) {
      return true;
    }
    return false;
  }

  isJobsRejected(): boolean {
    if (this.jobs.jobsTrackingId === this.dataJobsTracking[5].id) {
      return true;
    }
    return false;
  }

  save() {
    this.prepareJobs();
    this.edit(this.jobs);
  }

  saveDeactive() {
    this.prepareJobs();
    this.jobs.deleted = true;
    this.edit(this.jobs);
  }

  edit(jobs: JobsResponseModel) {
    this.isLoading = true;
    this.hasError = false;
    const params = new HttpParams().set('id', `${jobs.id}`);
    this.jobsService.setHostApi(this.HostAPIEndpoint);
    this.jobsService.setRelativeUrlApi(this.relativeUrl.concat(ResumeEndpoint.ENDPOINT_JOBS_UPDATE_ONE));
    const isUpdated = this.jobsService.updateWithParams(params, jobs).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(response => {
      if (response.header.code === 200) {
        this.jobs = response.data;
        this.prepareState = STATE_DEFAULT;
        this.state.emit(this.prepareState);
        this.loadForm();
        return of(this.jobs);
      } else {
        this.hasError = true;
        this.prepareState = STATE_DEFAULT;
        this.prepareState.status = ErrorStatus.ERROR;
        this.prepareState.code = response.header.code;
        this.prepareState.messageError = `${jobs.company} : ${response.message}`;
        this.prepareState.hasError = true;
        this.prepareState.description = 'Can not update jobs!';
        this.state.emit(this.prepareState);
        this.loadForm();
        return of(undefined);
      }
    });
    this.subscriptions.push(isUpdated);
  }

  openEditDescription(isActive: boolean) {
    this.isTurnOnDescription = isActive;
  }

  openEditNote(isActive: boolean) {
    this.isTurnOnNote = isActive;
  }

}
