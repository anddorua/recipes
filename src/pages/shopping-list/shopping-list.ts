import { Component } from '@angular/core';
import {IonicPage, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingList} from "../../services/shopping.list";
import {Ingredient} from "../../models/ingredient";
import {StoragePopoverPage} from "../sl-storage-popover/storage-popover";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(
    private sl: ShoppingList,
    private popCtrl: PopoverController,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  onSubmit(f: NgForm) {
    this.sl.add(f.value.ingredient, f.value.amount);
    f.reset();
  }

  getIngredientList(): Ingredient[] {
    return this.sl.get();
  }

  onCheckItem(ingredient: Ingredient) {
    this.sl.remove(ingredient.name, ingredient.amount);
  }

  onShowPopover(event) {
    const popover = this.popCtrl.create(StoragePopoverPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      }
      if (data.action == 'load') {
        const spinner = this.loadingCtrl.create({
          content: 'Loading data ...'
        });
        spinner.present();
        this.auth.getActiveUser().getToken()
          .then((token: string) => {
            this.sl.fetchList(token)
              .subscribe(
                () => {
                  spinner.dismiss();
                },
                error => {
                  this.alertCtrl.create({
                    title: 'Error',
                    subTitle: error.json().error,
                    buttons: ['Ok']
                  }).present();
                });
          });
      } else if (data.action == 'save') {
        const spinner = this.loadingCtrl.create({
          content: 'Saving data ...'
        });
        spinner.present();
        this.auth.getActiveUser().getToken()
          .then((token: string) => {
            this.sl.storeList(token)
              .subscribe(
                () => {
                  spinner.dismiss();
                },
                error => {
                  this.alertCtrl.create({
                    title: 'Error',
                    subTitle: error.json().error,
                    buttons: ['Ok']
                  }).present();
                });
          });
      }
    });
  }

}
