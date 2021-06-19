import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    // console.log('Task current: ', this.taskModel);
    // console.log('Tracking ID: ', this.jobsTrackingId);
  }

  logSalary(salary: number) {
    return `$ `.concat(salary + '');
  }
}
