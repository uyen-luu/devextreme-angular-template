import notify from 'devextreme/ui/notify';
import {confirm} from 'devextreme/ui/dialog';

export class AppNotify {
  static info(message: string) {
    notify(message, 'info', 5000);
  }

  static warning(message: string) {
    notify(message, 'warning', 5000);
  }

  static error(message: string = '') {
    if (!message) {
      message = ERROR;
    }
    notify(message, 'error', 5000);
  }

  static success(message: string) {
    notify(message, 'success', 5000);
  }

  static confirm(message: string, title: string): Promise<boolean> {
    return confirm(message, title);
  }
}

export const ERROR = 'An error has occurred. Please try again.';
