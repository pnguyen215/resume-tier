import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlibsPageSizes, BlibsPaginatorState } from 'ngx-blibs-api';
import * as $ from 'jquery';

@Component({
  selector: 'app-blibs-paginator',
  templateUrl: './blibs-paginator.component.html',
  styleUrls: ['./blibs-paginator.component.scss']
})
export class BlibsPaginatorComponent implements OnInit {
  @Input() paginator: BlibsPaginatorState;
  @Input() isLoading;
  @Output() paginate: EventEmitter<BlibsPaginatorState> = new EventEmitter();
  pageSizes: number[] = BlibsPageSizes;
  constructor() { }

  ngOnInit(): void {
    this.setStateDropdown();
  }

  setStateDropdown() {
    // tslint:disable-next-line: only-arrow-functions
    $(function () {

      $('.dropdown > .caption').on('click', function () {
        $(this).parent().toggleClass('open');
      });

      $('.dropdown > .list > .item').on('click', function () {
        $('.dropdown > .list > .item').removeClass('selected');
        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').text($(this).text());
      });

      // tslint:disable-next-line: only-arrow-functions
      $(document).on('keyup', function (evt) {
        // tslint:disable-next-line: deprecation
        if ((evt.keyCode || evt.which) === 27) {
          $('.dropdown').removeClass('open');
        }
      });

      // tslint:disable-next-line: only-arrow-functions
      $(document).on('click', function (evt) {
        if ($(evt.target).closest('.dropdown > .caption').length === 0) {
          $('.dropdown').removeClass('open');
        }
      });

    });
  }


  pageChange(num: number) {
    this.paginator.page = num;
    this.paginate.emit(this.paginator);
  }

  /*
    sizeChange() {
    this.paginator.pageSize = +this.paginator.pageSize;
    this.paginator.page = 1;
    this.paginate.emit(this.paginator);
  }
  */

  sizeChange(ps: number) {
    this.paginator.pageSize = ps;
    this.paginator.page = 1;
    this.paginate.emit(this.paginator);
  }
}
