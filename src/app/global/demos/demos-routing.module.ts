import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'component1',
        loadChildren: () => import('./component1/component1.module').then(module => module.Component1Module)
      },
      {
        path: 'component2',
        loadChildren: () => import('./component2/component2.module').then(module => module.Component2Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemosRoutingModule { }
