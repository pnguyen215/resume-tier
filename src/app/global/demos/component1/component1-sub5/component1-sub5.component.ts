import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTimepickerConfig, NgbDateAdapter, NgbDateParserFormatter, NgbTimeStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlibsBaseUtilsService } from 'ngx-blibs-api';
import { of, Subscription } from 'rxjs';
import { delay, tap, catchError, finalize } from 'rxjs/operators';
import { ParamsConfig } from 'src/app/global/configs/paramsConfig/params-config';
import { ResumeEndpoint } from 'src/app/resume/endpoints/resume-endpoint';
import { JobsRequestModel } from 'src/app/resume/model/jobs-request.model';
import { JobsTrackingResponseModel } from 'src/app/resume/model/jobs-tracking-response.model';
import { JobsService } from 'src/app/resume/services/jobs.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-component1-sub5',
  templateUrl: './component1-sub5.component.html',
  styleUrls: ['./component1-sub5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    NgbTimepickerConfig,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class Component1Sub5Component implements OnInit, OnDestroy {

  @Input() jobsTracking: JobsTrackingResponseModel;
  jobsRequest: JobsRequestModel;
  isLoading$;
  isLoading = false;
  hasError = false;
  formGroup: FormGroup;
  isDevMember: boolean;
  statusInterview: any;
  noteJobs: any;
  descriptionJobs: any;
  isTurnOnDescription = false;
  isTurnOnNote = false;
  time: NgbTimeStruct = { hour: new Date().getHours(), minute: new Date().getMinutes(), second: new Date().getSeconds() };
  private subscriptions: Subscription[] = [];
  protected HostAPIEndpoint = environment.RESUME_SERVER_URL;
  protected relativeUrl = ResumeEndpoint.ENDPOINT_JOBS_URL;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private datePipeService: DatePipe,
    private jobsService: JobsService,
    private blibsUtilService: BlibsBaseUtilsService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.jobsService.isLoading$;
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }

  reset() {
    this.formGroup.reset();
    this.modal.dismiss();
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
      company: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      jobsTitle: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      jobsTrackingId: [this.jobsTracking.jobsTrackingIndex],
    });
  }

  private prepareJobs() {
    const formData = this.formGroup.value;
    this.jobsRequest = {
      id: null,
      company: formData.company,
      jobsTitle: formData.jobsTitle,
      jobsTrackingId: formData.jobsTrackingId
    };

  }

  save() {
    this.prepareJobs();
    this.create(this.jobsRequest);
  }

  create(jobs: JobsRequestModel) {
    this.isLoading = true;
    this.jobsService.setHostApi(this.HostAPIEndpoint);
    this.jobsService.setRelativeUrlApi(this.relativeUrl.concat(ResumeEndpoint.ENDPOINT_JOBS_CREATE_ONE));
    const isCreated = this.jobsService.createHttps('post', jobs).pipe(
      delay(1000),
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
      // tslint:disable-next-line: deprecation
    ).subscribe(response => {
      if (response.header.code === 200) {
        console.log(this.blibsUtilService.toJson(response));
      } else {
        return of(undefined);
      }
    });
    this.subscriptions.push(isCreated);
  }

}
