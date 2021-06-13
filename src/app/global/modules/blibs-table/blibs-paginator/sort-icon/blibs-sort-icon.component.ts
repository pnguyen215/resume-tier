import { Component, OnInit, Input, OnChanges, ElementRef, Output, EventEmitter } from '@angular/core';
import { BlibsSortDirection } from 'ngx-blibs-api';

@Component({
  selector: 'app-blibs-sort-icon',
  templateUrl: './blibs-sort-icon.component.html',
  styleUrls: ['./blibs-sort-icon.component.scss']
})
export class BlibsSortIconComponent implements OnInit, OnChanges {
  @Input() column: string;
  @Input() activeColumn: string;
  @Input() activeDirection: BlibsSortDirection;
  @Output() sort: EventEmitter<string> = new EventEmitter<string>();
  isActive = false;

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    const parent = this.el.nativeElement.parentElement;
    if (!parent) {
      return;
    }

    // Load css classes
    parent.classList.add('sortable');
    parent.classList.remove('sortable-active');
    if (this.column === this.activeColumn) {
      parent.classList.add('sortable-active');
    }

    // load icons
    this.isActive = this.column === this.activeColumn;
  }

  ngOnInit(): void {
    const parent = this.el.nativeElement.parentElement as Element;
    if (!parent) {
      return;
    }

    parent.addEventListener('click', () => {
      this.sort.emit(this.column);
    });
  }
}
