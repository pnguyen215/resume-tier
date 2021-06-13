import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { BlibsNgPagination } from './blibs-paginator/blibs-ng-pagination/blibs-ng-pagination.component';
import { BlibsSortIconComponent } from './blibs-paginator/sort-icon/blibs-sort-icon.component';
import { BlibsPaginatorComponent } from './blibs-paginator/blibs-paginator.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
    declarations: [BlibsPaginatorComponent, BlibsNgPagination, BlibsSortIconComponent],
    imports: [CommonModule, FormsModule, InlineSVGModule, PerfectScrollbarModule],
    exports: [BlibsPaginatorComponent, BlibsNgPagination, BlibsSortIconComponent],
})
export class BlibsTableModule { }
