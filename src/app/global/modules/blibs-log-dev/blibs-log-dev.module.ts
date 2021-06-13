import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlibsLogDevRoutingModule } from './blibs-log-dev-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlibsLogDevComponent } from './blibs-log-dev.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AutoWrapDirective } from '../../pipes/auto-wrap.directive';
import { PrettyJsonPipe } from '../../pipes/pretty-json.pipe';

@NgModule({
  declarations: [BlibsLogDevComponent, PrettyJsonPipe, AutoWrapDirective],
  entryComponents: [BlibsLogDevComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlibsLogDevRoutingModule,
    InlineSVGModule,
    NgbModalModule,
    NgbModule,
    PerfectScrollbarModule,
    MatSnackBarModule
  ]
})
export class BlibsLogDevModule { }
