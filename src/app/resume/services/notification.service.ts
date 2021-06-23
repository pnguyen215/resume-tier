import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private messageService: MessageService
  ) { }

  /**
   * @param message - set content to show message
   * @param type - type of message: warn / info / error / success
   * @param header - set title header of message
   */
  showMessage(message: string, type: string, header: string) {
    this.messageService.add({ severity: type, summary: header, detail: `${message}` });
  }

  /**
   * @param message - set content to show message
   * @param type - type of message: warn / info / error / success
   * @param header - set title header of message
   * @param position - set position to show message: top-left: tl | top-right: tr | top-center: tc |
   *  bottom-left : bl | bottom-right: br | bottom-center : bc
   */
  _showMessage(message: string, type: string, header: string, position: string) {
    this.messageService.add({ key: position, severity: type, summary: header, detail: `${message}` });
  }
}
