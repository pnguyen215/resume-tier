import { Component, Input, OnInit } from '@angular/core';
import { BlibsBaseUtilsService } from 'ngx-blibs-api';
import { JobsStatus } from 'src/app/resume/model/enums/jobs-status';
import { TimeUtil } from 'src/app/resume/utils/time.util';

@Component({
  selector: 'app-component1-sub3',
  templateUrl: './component1-sub3.component.html',
  styleUrls: ['./component1-sub3.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'task'
  }
})
export class Component1Sub3Component implements OnInit {

  @Input() taskModel: any;
  @Input() jobsTrackingId: number;
  dataJobsStatus: any[] = [];

  constructor(
    private blibsUtilService: BlibsBaseUtilsService
  ) { }

  ngOnInit(): void {
    this.dataJobsStatus = this.blibsUtilService.enumToDescriptedArray(JobsStatus);
  }

  logSalary(salary: number) {
    return `$ `.concat(salary + '');
  }

  handleTimeDiff(date: string): any {
    if (!this.blibsUtilService.areNotNull(date)) {
      return null;
    }
    return TimeUtil.handleTimeDurations(date);
  }

  handleStyleStatusJob(statusId: number) {
    if (!statusId) {
      return '';
    }
    const style = 'label label-pill label-inline ';

    if (statusId === 1) {
      return style.concat('label-success');
    }

    if (statusId === 2) {
      return style.concat('label-warning');
    }

    if (statusId === 3) {
      return style.trim();
    }

    return style.trim();
  }
}
