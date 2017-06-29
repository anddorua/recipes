import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-gesture-control',
  template: `
    <ion-row>
      <ion-col><button ion-button small color="danger" block (click)="onReset('all')">Reset All</button></ion-col>
      <ion-col><button ion-button small color="danger" block (click)="onReset('taps')">Reset "Taps"</button></ion-col>
      <ion-col><button ion-button small color="danger" block (click)="onReset('press')">Reset "Presses"</button></ion-col>
    </ion-row>
  `
})
export class GestureControlComponent {

  @Output() didReset = new EventEmitter<string>();

  onReset(kind: string) {
    this.didReset.emit(kind);
  }
}
