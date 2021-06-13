import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Component2Sub1Component } from './component2-sub1/component2-sub1.component';
import { Component2Sub2Component } from './component2-sub2/component2-sub2.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'component2-sub1',
        component: Component2Sub1Component
      },
      {
        path: 'component2-sub2',
        component: Component2Sub2Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Component2RoutingModule { }
