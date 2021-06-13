import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import exportFromJSON from 'export-from-json';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-blibs-log-dev',
  templateUrl: './blibs-log-dev.component.html',
  styleUrls: ['./blibs-log-dev.component.scss']
})
export class BlibsLogDevComponent implements OnInit, OnDestroy {

  @Input() objs: any[] = [];
  @Input() titleObj: string;
  @Input() titleObjIds: string;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    private snackBarService: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  exportObjsJson() {
    const data = this.objs;
    const fileName = this.titleObj;
    const exportType = 'json';
    exportFromJSON({ data, fileName, exportType });
  }

  exportObjsCsv() {
    const data = Array(this.objs);
    const fileName = this.titleObj;
    const exportType = 'csv';
    exportFromJSON({ data, fileName, exportType });
  }

  copyContent(data: any) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(data);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  openSnackBar(message: string, action: string) {
    const horizontalPosition = 'center';
    this.snackBarService.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: horizontalPosition as MatSnackBarHorizontalPosition
    });
  }

}
