import { Injectable } from '@angular/core';
import { Board } from '../model/class/board';
import { Column } from '../model/class/column';
import { Task } from '../model/class/task';

@Injectable({
  providedIn: 'root'
})
export class DataMockService {

  constructor() { }

  private kanbanModal: Board = new Board('Scrum Team - Mobile App Development',
    [
      new Column('Backlog', [
        new Task('Sit enim dolore sint voluptate sunt nisi id est eu', 5, 'Phuoc'),
        new Task('Sunt nisi id est eu dolore eu esse ullamco. Amet ut', 5),
        new Task('Cillum ut do mollit ut aute nisi consectetur duis ut velit eiusmod aliqua elit', 3),
        new Task('Velit fugiat pariatur amet adipisicing ad ex occaecat officia', 1)
      ]),
      new Column('Todo', [
        new Task('Tempor anim aute elit adipisicing aliqua in eiusmod laboris amet', 8),
        new Task('Est exercitation Lorem exercitation incididunt tempor velit', 13),
        new Task('Lorem consequat culpa minim. Ad voluptate laboris ullamco laboris reprehenderit', 5)
      ]),
      new Column('InProgress', [
        new Task('Ad laboris aute dolor voluptate commodo dolore', 5, 'Bertie Kidd'),
        new Task('Ad exercitation non consequat cupidatat dolor adipisicing', 1, 'Kane Foley')
      ]),
      new Column('Done', [
        new Task('Adipisicing sunt occaecat et sunt reprehenderit magna fugiat', 5, 'Jimenez Maxwell'),
        new Task('Proident ut adipisicing est ex duis. Excepteur aliquip nostrud', 3, 'Kane Foley'),
        new Task('Commodo nulla nisi consectetur amet incididunt cupidatat in', 1, 'Linda Campbell'),
      ])
    ]);

  public getData(): Board {
    return this.kanbanModal;
  }
}
