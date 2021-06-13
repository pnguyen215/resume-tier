import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CommonServicesModule } from 'src/app/global/commons/common-services.module';
import { BlibsLogDevModule } from 'src/app/global/modules/blibs-log-dev/blibs-log-dev.module';
import { BlibsTableModule } from 'src/app/global/modules/blibs-table/blibs-table.module';
import { ResumeSignInComponent } from './resume-sign-in/resume-sign-in.component';
import { CardModule } from 'src/app/global/modules/card/card.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from 'src/app/modules/auth/auth-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonServicesModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule,
    PerfectScrollbarModule,
    BlibsTableModule,
    BlibsLogDevModule,
    CardModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  declarations: [
    ResumeSignInComponent
  ],
  entryComponents: [
    ResumeSignInComponent
  ],
  exports: [
    ResumeSignInComponent
  ]
})
export class ResumeSignInModule { }
