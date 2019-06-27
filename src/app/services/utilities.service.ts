import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  static redirect(path: string) {
    const link = document.createElement('a');
    link.href = path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  constructor() { }
}
