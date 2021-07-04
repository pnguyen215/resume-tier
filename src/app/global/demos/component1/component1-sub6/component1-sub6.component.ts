import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-component1-sub6',
  templateUrl: './component1-sub6.component.html',
  styleUrls: ['./component1-sub6.component.scss']
})
export class Component1Sub6Component implements OnInit {

  @Output() mode: EventEmitter<boolean> = new EventEmitter();
  @Output() modeTypeExport: EventEmitter<number> = new EventEmitter();
  checkSwitch = false;
  typeId: number;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  switchMode(checked: boolean) {
    this.checkSwitch = checked;
    this.mode.emit(this.checkSwitch);
  }

  submitModeType($event: any) {
    console.log('Mode type Export C1S6: ', $event);
    this.typeId = $event;
    this.modeTypeExport.emit(this.typeId);
  }

}
