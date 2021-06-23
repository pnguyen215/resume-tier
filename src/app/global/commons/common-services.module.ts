import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthResumeService } from 'src/app/resume/services/auth-resume.service';
import { DataMockService } from 'src/app/resume/services/data-mock.service';
import { JobsTrackingService } from 'src/app/resume/services/jobs-tracking.service';
import { NotificationService } from 'src/app/resume/services/notification.service';
import { MessageService } from 'primeng/api';

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
    JobsTrackingService,
    MessageService,
    NotificationService
  ]
})
export class CommonServicesModule { }
