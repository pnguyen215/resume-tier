// Fork of https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/pagination/pagination-config.ts
import { Injectable } from '@angular/core';
import { BlibsPageSizes } from 'ngx-blibs-api';

/**
 * A configuration service for the [`NgPagination`](#/components/paginator/api#NgPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
@Injectable({ providedIn: 'root' })
export class BlibsNgPaginationConfig {
  disabled = false;
  boundaryLinks = false;
  directionLinks = true;
  ellipses = true;
  maxSize = 0;
  pageSize = BlibsPageSizes[2];
  rotate = false;
  size: 'sm' | 'lg';
}
