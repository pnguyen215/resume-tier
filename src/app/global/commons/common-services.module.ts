import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthResumeService } from 'src/app/resume/services/auth-resume.service';
import { DataMockService } from 'src/app/resume/services/data-mock.service';
import { JobsTrackingService } from 'src/app/resume/services/jobs-tracking.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // custom service here!
    AuthResumeService,
    DataMockService,
    JobsTrackingService
  ]
})
export class CommonServicesModule { }
