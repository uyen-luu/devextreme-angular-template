export class AppStorage {
  constructor() {
  }

  static getData(dataKey: string): string {
    const token = localStorage.getItem(dataKey);
    return !!token ? decodeURIComponent(atob(token)) : null;
  }

  static storeData(dataKey: string, data: any) {
    localStorage.setItem(dataKey, btoa(encodeURIComponent(data)));
  }
}
