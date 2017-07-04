import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
@Component({
  selector: 'sl-storage-popover',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h1>Load & Save</h1>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onStorageAction('load')">Load List</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onStorageAction('save')">Save List</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class StoragePopoverPage {

  constructor(
    private viewCtrl: ViewController
  ){}

  onStorageAction(action: string) {
    this.viewCtrl.dismiss({ action: action });
  }

}
