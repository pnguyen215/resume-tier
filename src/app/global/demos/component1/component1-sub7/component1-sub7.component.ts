import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-component1-sub7',
  templateUrl: './component1-sub7.component.html',
  styleUrls: ['./component1-sub7.component.scss']
})
export class Component1Sub7Component implements OnInit {

  @Output() modeType: EventEmitter<number> = new EventEmitter();
  typeId: number;

  constructor() { }

  ngOnInit(): void {
  }

  handleModeType(type: number) {
    this.typeId = type;
    this.modeType.emit(this.typeId);
  }

}
