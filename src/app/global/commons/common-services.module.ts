import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthResumeService } from 'src/app/resume/services/auth-resume.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // custom service here!
    AuthResumeService
  ]
})
export class CommonServicesModule { }
