import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CommonServicesModule } from '../commons/common-services.module';
import { BlibsLogDevModule } from '../modules/blibs-log-dev/blibs-log-dev.module';
import { BlibsTableModule } from '../modules/blibs-table/blibs-table.module';
import { DemosRoutingModule } from './demos-routing.module';
import { Component1Module } from './component1/component1.module';
import { Component2Module } from './component2/component2.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemosRoutingModule,
    CommonServicesModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule,
    PerfectScrollbarModule,
    BlibsTableModule,
    BlibsLogDevModule,
    Component1Module,
    Component2Module
  ],
  declarations: [],
  entryComponents: [],
  exports: []
})
export class DemosModule { }
