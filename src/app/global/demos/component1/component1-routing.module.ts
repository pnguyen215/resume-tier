import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Component1Sub1Component } from './component1-sub1/component1-sub1.component';
import { Component1Sub2Component } from './component1-sub2/component1-sub2.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'component1-sub1',
        component: Component1Sub1Component
      },
      {
        path: 'component1-sub2',
        component: Component1Sub2Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Component1RoutingModule { }
