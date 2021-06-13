import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlibsLogDevComponent } from './blibs-log-dev.component';

const routes: Routes = [
  {
    path: '',
    component: BlibsLogDevComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlibsLogDevRoutingModule { }
