import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1RoutingModule } from './component1-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component1Sub1Component } from './component1-sub1/component1-sub1.component';
import { Component1Sub2Component } from './component1-sub2/component1-sub2.component';
import { CardModule } from '../../modules/card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModalModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CommonServicesModule } from '../../commons/common-services.module';
import { BlibsLogDevModule } from '../../modules/blibs-log-dev/blibs-log-dev.module';
import { BlibsTableModule } from '../../modules/blibs-table/blibs-table.module';
import { Component1Sub3Component } from './component1-sub3/component1-sub3.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Component1RoutingModule,
    CardModule,
    DragDropModule,
    CommonServicesModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbModule,
    PerfectScrollbarModule,
    BlibsTableModule,
    BlibsLogDevModule,
  ],
  declarations: [
    Component1Sub1Component,
    Component1Sub2Component,
    Component1Sub3Component
  ],
  entryComponents: [
    Component1Sub1Component,
    Component1Sub2Component,
    Component1Sub3Component
  ],
  exports: [
    Component1Sub1Component,
    Component1Sub2Component,
    Component1Sub3Component
  ]
})
export class Component1Module { }
