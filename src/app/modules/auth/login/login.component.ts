import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, delay, finalize, first, tap } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesConfig } from 'src/app/global/configs/quotesConfig/quotes-config';
import { UserRequest } from 'src/app/resume/model/user-request.model';
import { AuthResumeService } from 'src/app/resume/services/auth-resume.service';
import { BlibsStorageService, Logger, SignInResponse } from 'ngx-blibs-api';
import { UserFailedResponseModel } from 'src/app/resume/model/user-failed-response.model';
import { UserSuccessResponseModel } from 'src/app/resume/model/user-success-response.model';
import * as CONST from 'ngx-blibs-api';
import { AuthEndpoint } from 'src/app/resume/endpoints/auth-endpoint';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;
  hasError: boolean;
  isLoading = false;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  qoutes = QuotesConfig.getQuotesSignIn();
  user$: Observable<any>;
  userRequest: UserRequest;
  private listUserSuccessResponse = new BehaviorSubject<UserSuccessResponseModel>(null);
  private listUserFailedResponse = new BehaviorSubject<UserFailedResponseModel>(null);
  protected relativeUrl = AuthEndpoint.ENDPOINT_USER_BUZZ_URL;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authResumeService: AuthResumeService,
    private blibsStorageService: BlibsStorageService,
  ) {
    this.isLoading$ = this.authResumeService.isLoading$;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  get forms() {
    return this.loginForm.controls;
  }

  submitDefault() {
    this.hasError = false;
    const loginSubscribe = this.authService
      .login(this.defaultAuth.email, this.defaultAuth.password)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscribe);
  }

  onSubmitUserDetail() {
    this.authResumeService.setRelativeUrlApi(this.relativeUrl.concat(AuthEndpoint.ENDPOINT_USER_BUZZ_CURRENT));
    const isGetted = this.authResumeService.createHttps('get', this.userRequest).pipe(
      tap(() => {
      }),
      catchError((errors) => {
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(response => {
      this.blibsStorageService.set(CONST.Storage.USER_INFO, response);
    });
    this.unsubscribe.push(isGetted);
  }

  onSubmit() {
    this.isLoading = true;
    this.hasError = false;
    this.userRequest = {
      id: null,
      username: this.forms.email.value,
      password: this.forms.password.value
    };
    this.authResumeService.setRelativeUrlApi(this.relativeUrl.concat(AuthEndpoint.ENDPOINT_USER_BUZZ_SIGN_IN));
    const isSignedIn = this.authResumeService.createHttps('post', this.userRequest).pipe(
      first()
    ).subscribe(response => {
      if (response.header) {
        if (response.header.code === 200) {
          this.hasError = false;
          this.isLoading = false;
          this.listUserSuccessResponse.next(response);
          const signInModel = new SignInResponse(response);
          this.blibsStorageService.set(CONST.Storage.TOKEN, signInModel.data);
          // this.onSubmitUserDetail();
          this.submitDefault();
        } else {
          this.listUserFailedResponse.next(response);
          this.hasError = true;
          this.isLoading = false;
        }
      } else {
        this.hasError = true;
      }
    });
    this.unsubscribe.push(isSignedIn);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((subscribe) => subscribe.unsubscribe());
  }
}
