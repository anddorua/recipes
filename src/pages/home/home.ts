import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  taps: number = 0;
  press: number = 0;

  onDidReset(kind: string) {
    switch(kind) {
      case 'all':
        this.press = 0;
        this.taps = 0;
        break;
      case 'press':
        this.press = 0;
        break;
      case 'taps':
        this.taps = 0;
        break;
      default:
        console.warn(`Unknown reset kind: ${kind}`);
    }
  }

  onSensorTap() {
    this.taps += 1;
  }

  onSensorPress() {
    this.press += 1;
  }

  didWin(): boolean {
    return this.press == 4 && this.taps == 2;
  }
}
