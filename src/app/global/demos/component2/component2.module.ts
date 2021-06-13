import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component2RoutingModule } from './component2-routing.module';
import { Component2Sub1Component } from './component2-sub1/component2-sub1.component';
import { Component2Sub2Component } from './component2-sub2/component2-sub2.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Component2RoutingModule,
  ],
  declarations: [
    Component2Sub1Component,
    Component2Sub2Component
  ],
  entryComponents: [
    Component2Sub1Component,
    Component2Sub2Component
  ],
  exports: [
    Component2Sub1Component,
    Component2Sub2Component
  ]
})
export class Component2Module { }
