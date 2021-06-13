import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1RoutingModule } from './component1-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component1Sub1Component } from './component1-sub1/component1-sub1.component';
import { Component1Sub2Component } from './component1-sub2/component1-sub2.component';
import { CardModule } from '../../modules/card/card.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Component1RoutingModule,
    CardModule
  ],
  declarations: [
    Component1Sub1Component,
    Component1Sub2Component
  ],
  entryComponents: [
    Component1Sub1Component,
    Component1Sub2Component
  ],
  exports: [
    Component1Sub1Component,
    Component1Sub2Component
  ]
})
export class Component1Module { }
