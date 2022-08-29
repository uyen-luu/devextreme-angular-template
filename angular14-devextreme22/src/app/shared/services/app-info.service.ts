import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Angular DevExtreme Template';
  }

  public get author() {
    return 'Uyen Luu';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
